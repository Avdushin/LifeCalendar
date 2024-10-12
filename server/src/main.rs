use actix_web::{App, HttpServer, web, middleware};
use dotenv::dotenv;
use sqlx::PgPool;
use std::env;

mod auth;
mod tasks;
mod events;
mod routes;

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    dotenv().ok();
    let database_url = env::var("DATABASE_URL").expect("DATABASE_URL must be set");
    let pool = PgPool::connect(&database_url).await.unwrap();
    let server_address = env::var("SERVER_ADDRESS").expect("SERVER_ADDRESS must be set");

    println!("Server run at the {server_address}");

    HttpServer::new(move || {
        App::new()
            .app_data(web::Data::new(pool.clone()))
            .wrap(middleware::Logger::default()) 
            .configure(routes::config_routes)
    })
    .bind(&server_address)?
    .run()
    .await
}
