use actix_web::{web, App, HttpResponse, HttpServer, Responder, middleware};
use serde::{Deserialize, Serialize};
use listenfd::ListenFd;

#[derive(Serialize)]
struct MediaItem {
    id: String,
    postId: String,
    uri: String,
    liveUri: Option<String>,
}

#[derive(Serialize)]
struct Post {
    id: String,
    userId: String,
    caption: String,
    likes: i32,
    mediaItems: Vec<MediaItem>,
    comments: Vec<Comment>,
}

async fn get_posts() -> impl Responder {
    let posts = vec![
        Post {
            id: "1".to_string(),
            userId: "1".to_string(),
            caption: "Test Post 1".to_string(),
            likes: 21,
            mediaItems: vec![
                MediaItem {
                    id: "1234".to_string(),
                    postId: "1234".to_string(),
                    uri: "http://engagement.abysmalsoft.org.s3.amazonaws.com/Engagement%20Photo%203.jpg".to_string(),
                    liveUri: None
                }
            ],
            comments: vec![
                Comment {
                    userId: "Gordon".to_string(),
                    id: "1".to_string(),
                    postId: "1".to_string(),
                    body: "First!".to_string(),
                    replyToId: None,
                },
                Comment {
                    userId: "Franco".to_string(),
                    id: "2".to_string(),
                    postId: "1".to_string(),
                    body: "What a great picture! And great word wrapping wrapping wrapping wrapping wrapping.".to_string(),
                    replyToId: None,
                }
            ]
        }
    ];
    HttpResponse::Ok().json(&posts[0])
}

#[derive(Deserialize)]
struct CreatePost {
    userId: String,
    caption: String,
    image: String,
    live: String,
}

async fn create_post(post: web::Json<CreatePost>) -> impl Responder {
    format!("Got a post {}", post.caption)
}

#[derive(Deserialize, Serialize)]
struct Comment {
    id: String,
    userId: String,
    postId: String,
    body: String,
    replyToId: Option<String>,
}

async fn create_comment(comment: web::Json<Comment>) -> impl Responder {
    format!("Got a comment {}", comment.body)
}

#[derive(Deserialize)]
struct UserInfo {
    userId: String,
}

async fn get_user(params: web::Path<UserInfo>) -> impl Responder {
    HttpResponse::Ok().body(format!("Hello {}", params.userId))
}

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
        server.bind("127.0.0.1:3000")?
    };

    server.run().await
}