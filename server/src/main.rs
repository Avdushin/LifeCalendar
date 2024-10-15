use actix_web;
use dotenv::dotenv;
use sqlx::PgPool;
use std::env;

mod auth;
mod tasks;
mod events;
mod routes;
mod server;

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    dotenv().ok();
    let database_url = env::var("DATABASE_URL").expect("DATABASE_URL must be set");
    let pool = PgPool::connect(&database_url).await.unwrap();
    let server_address = env::var("SERVER_ADDRESS").expect("SERVER_ADDRESS must be set");

    println!("Server run at the {server_address}");

    server::run_server(pool, &server_address).await
}
