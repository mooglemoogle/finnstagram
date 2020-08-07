use actix_web::{web, App, HttpResponse, HttpServer, Responder};
use listenfd::ListenFd;

async fn index(params: web::Path<(String,)>) -> impl Responder {
    HttpResponse::Ok().body(format!("Hello {}", params.0))
}

async fn index2(params: web::Path<(String,)>) -> impl Responder {
    HttpResponse::Ok().body(format!("Good Bye {}", params.0))
}

#[actix_rt::main]
async fn main() -> std::io::Result<()> {
    let mut listenfd = ListenFd::from_env();
    let mut server = HttpServer::new(|| {
        App::new().service(
            web::scope("/api")
                .service(
                    web::resource("/hello/{name}")
                        .name("hiyo")
                        .route(web::get().to(index))
                )
                .service(
                    web::resource("/goodbye/{name}")
                        .name("biyo")
                        .route(web::get().to(index2))
                )
        )
    });

    server = if let Some(l) = listenfd.take_tcp_listener(0).unwrap() {
        server.listen(l)?
    } else {
        server.bind("127.0.0.1:3000")?
    };

    server.run().await
}