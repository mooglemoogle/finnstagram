use actix_web::{web, App, HttpServer, middleware};
use listenfd::ListenFd;

mod posts;
mod users;

use posts::handlers::{get_posts, create_post, create_comment};
use users::handlers::{get_user};

#[actix_rt::main]
async fn main() -> std::io::Result<()> {
    let mut listenfd = ListenFd::from_env();
    let mut server = HttpServer::new(|| {
        App::new()
            .wrap(middleware::Compress::default())
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
                        web::resource("/users/{userId}")
                            .name("users")
                            .route(web::get().to(get_user))
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