#[macro_use]
extern crate diesel;

use actix_web::{web, App, HttpServer, middleware, Error, dev::ServiceRequest};
use diesel::prelude::*;
use diesel::r2d2::{self, ConnectionManager};
use listenfd::ListenFd;

mod posts;
mod users;
mod schema;
mod models;

use posts::handlers::{get_posts, create_post, create_comment};
use users::handlers::{get_users, add_user, get_user, delete_user};

pub type Pool = r2d2::Pool<ConnectionManager<PgConnection>>;

#[actix_rt::main]
async fn main() -> std::io::Result<()> {
    dotenv::dotenv().ok();
    let mut listenfd = ListenFd::from_env();
    std::env::set_var("RUST_LOG", "actix_web=debug");
    let database_url = std::env::var("DATABASE_URL").expect("DATABASE_URL must be set");


    // create db connection pool
    let manager = ConnectionManager::<PgConnection>::new(database_url);
    let pool: Pool = r2d2::Pool::builder()
        .build(manager)
        .expect("Failed to create pool.");

    let mut server = HttpServer::new(move || {
        App::new()
            .wrap(middleware::Compress::default())
            .data(pool.clone())
            .service(
                web::scope("/api/v1")
                    .service(
                        web::resource("/posts")
                            .name("posts")
                            .route(web::get().to(get_posts))
                            .route(web::post().to(create_post))
                    )
                    .service(
                        web::resource("/comments")
                            .name("comments")
                            .route(web::post().to(create_comment))
                    )
                    .service(
                        web::resource("/users")
                            .name("users")
                            .route(web::get().to(get_users))
                            .route(web::post().to(add_user))
                    )
                    .service(
                        web::resource("/users/{id}")
                            .name("user_by_id")
                            .route(web::get().to(get_user))
                            .route(web::delete().to(delete_user))
                    )
            )
    });

    server = if let Some(l) = listenfd.take_tcp_listener(0).unwrap() {
        server.listen(l)?
    } else {
        server.bind("0.0.0.0:3000")?
    };

    server.run().await
}