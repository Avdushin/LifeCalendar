use actix_web::{web, HttpResponse, Responder};
use bcrypt::{hash, verify, DEFAULT_COST};
use jsonwebtoken::{encode, Header, EncodingKey};
use serde::{Deserialize, Serialize};
use chrono::{Utc, Duration};
use sqlx::PgPool;
use uuid::Uuid;
use std::env;

#[derive(Deserialize)]
pub struct RegisterData {
    pub username: String,
    pub email: String,
    pub password: String,
    pub birthdate: String,
    pub first_name: Option<String>,
    pub last_name: Option<String>,
    pub middle_name: Option<String>,
    pub country: Option<String>,
    pub city: Option<String>,
    pub phone: Option<String>,
}

#[derive(Deserialize)]
pub struct LoginData {
    pub email: String,
    pub password: String,
}

#[derive(Serialize, Deserialize)]
struct UserResponse {
    id: Uuid,
    username: String,
    email: String,
    birthdate: String,
    first_name: Option<String>,
    last_name: Option<String>,
    middle_name: Option<String>,
    country: Option<String>,
    city: Option<String>,
    phone: Option<String>,
}

#[derive(Serialize)]
struct Claims {
    id: Uuid,
    username: String,
    email: String,
    birthdate: String,
    first_name: Option<String>,
    last_name: Option<String>,
    middle_name: Option<String>,
    country: Option<String>,
    city: Option<String>,
    phone: Option<String>,
    exp: usize,
}

pub async fn register_user(
    pool: web::Data<PgPool>,
    form: web::Json<RegisterData>
) -> impl Responder {
    let password_hash = match hash(&form.password, DEFAULT_COST) {
        Ok(hash) => hash,
        Err(_) => return HttpResponse::InternalServerError().body("Error hashing password"),
    };

    let user = sqlx::query_as!(
        UserResponse,
        "INSERT INTO users (username, email, password_hash, birthdate, first_name, last_name, middle_name, country, city, phone)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
         RETURNING id, username, email, birthdate, first_name, last_name, middle_name, country, city, phone",
        form.username,
        form.email,
        password_hash,
        form.birthdate,
        form.first_name,
        form.last_name,
        form.middle_name,
        form.country,
        form.city,
        form.phone
    )
    .fetch_one(pool.get_ref())
    .await;

    match user {
        Ok(user) => HttpResponse::Ok().json(user),
        Err(e) => HttpResponse::BadRequest().body(format!("Error creating user: {}", e)),
    }
}

pub async fn login_user(
    pool: web::Data<PgPool>,
    form: web::Json<LoginData>
) -> impl Responder {
    let user = sqlx::query!(
        "SELECT id, username, email, birthdate, first_name, last_name, middle_name, country, city, phone, password_hash FROM users WHERE email = $1",
        form.email
    )
    .fetch_one(pool.get_ref())
    .await;

    match user {
        Ok(user) => {
            if verify(&form.password, &user.password_hash).unwrap() {
                let jwt_secret = env::var("JWT_SECRET").expect("JWT_SECRET must be set");
                // @ Expiration date for 1 mounth
                let expiration = Utc::now()
                    .checked_add_signed(Duration::days(30))
                    .expect("valid timestamp")
                    .timestamp();
                
                let claims = Claims {
                    id: user.id,
                    username: user.username,
                    email: user.email,
                    birthdate: user.birthdate,
                    first_name: user.first_name,
                    last_name: user.last_name,
                    middle_name: user.middle_name,
                    country: user.country,
                    city: user.city,
                    phone: user.phone,
                    exp: expiration as usize,
                };

                let token = match encode(&Header::default(), &claims, &EncodingKey::from_secret(jwt_secret.as_ref())) {
                    Ok(t) => HttpResponse::Ok().json(serde_json::json!({ "token": t })),
                    Err(_) => HttpResponse::InternalServerError().body("Error generating token"),
                };
                token
            } else {
                HttpResponse::Unauthorized().body("Invalid credentials")
            }
        },
        Err(_) => HttpResponse::BadRequest().body("User not found"),
    }
}
