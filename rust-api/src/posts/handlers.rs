use actix_web::{web, HttpResponse, Responder};
use chrono::{Duration, Utc};
use super::structs::{Post, Comment, MediaItem, CreatePost};

pub async fn get_posts() -> impl Responder {
    let first_date = Utc::now().to_rfc3339();
    let second_date = Utc::now().checked_add_signed(Duration::minutes(5)).unwrap().to_rfc3339();

    let posts = vec![
        Post {
            id: "1".to_string(),
            userId: "1".to_string(),
            createdDate: first_date.to_string(),
            caption: "Test Post 1".to_string(),
            likes: 21,
            mediaItems: vec![
                MediaItem {
                    id: "1234".to_string(),
                    postId: "1".to_string(),
                    createdDate: first_date.to_string(),
                    uri: "http://engagement.abysmalsoft.org.s3.amazonaws.com/Engagement%20Photo%203.jpg".to_string(),
                    liveUri: None
                }
            ],
            comments: vec![
                Comment {
                    userId: "Gordon".to_string(),
                    id: "1".to_string(),
                    postId: "1".to_string(),
                    createdDate: first_date.to_string(),
                    body: "Ooga Booga!".to_string(),
                    replyToId: None,
                },
                Comment {
                    userId: "Franco".to_string(),
                    id: "2".to_string(),
                    postId: "1".to_string(),
                    createdDate: first_date.to_string(),
                    body: "What a great picture! And great word wrapping wrapping wrapping wrapping wrapping.".to_string(),
                    replyToId: None,
                }
            ]
        },
        Post {
            id: "2".to_string(),
            userId: "1".to_string(),
            createdDate: second_date.to_string(),
            caption: "Test Post 2".to_string(),
            likes: 63,
            mediaItems: vec![
                MediaItem {
                    id: "3".to_string(),
                    postId: "2".to_string(),
                    createdDate: second_date.to_string(),
                    uri: "http://engagement.abysmalsoft.org.s3.amazonaws.com/Engagement%20Photo%203.jpg".to_string(),
                    liveUri: None,
                },
            ],
            comments: vec![
                Comment {
                    userId: "Franco".to_string(),
                    id: "2".to_string(),
                    postId: "2".to_string(),
                    createdDate: second_date.to_string(),
                    body: "Too slow, sucka'!".to_string(),
                    replyToId: None,
                }
            ],
        }
    ];
    HttpResponse::Ok().json(&posts)
}

pub async fn create_post(post: web::Json<CreatePost>) -> impl Responder {
    format!("Got a post {}", post.caption)
}

pub async fn create_comment(comment: web::Json<Comment>) -> impl Responder {
    format!("Got a comment {}", comment.body)
}