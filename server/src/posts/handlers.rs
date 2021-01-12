use actix_web::{web, HttpResponse, Error};
use crate::models::{Post, NewPost, MediaItem, NewMediaItem, Comment, NewComment};
use crate::schema::posts::dsl::*;
use crate::schema::media_items::dsl::*;
use crate::schema::comments::dsl::*;
use crate::Pool;
use crate::diesel::QueryDsl;
use crate::diesel::RunQueryDsl;
use diesel::dsl::{delete, insert_into};
use serde::{Deserialize, Serialize};
use std::vec::Vec;
use uuid::{Uuid};

pub async fn get_posts(db: web::Data<Pool>) -> Result<HttpResponse, Error> {
    Ok(web::block(move || get_latest_posts(db))
        .await
        .map(|post| HttpResponse::Ok().json(post))
        .map_err(|_| HttpResponse::InternalServerError())?
    )
}

fn get_latest_posts(pool: web::Data<Pool>) -> Result<Vec<Post>, diesel::result::Error> {
    let conn = pool.get().unwrap();
    let items = posts.load::<Post>(&conn)?;
    Ok(items)
}

pub async fn get_post(db: web::Data<Pool>, post_id: web::Path<String>) -> Result<HttpResponse, Error> {
    let user_uuid = Uuid::parse_str(&post_id.into_inner()).unwrap();
    Ok(
        web::block(move || db_get_user_by_id(db, user_uuid))
            .await
            .map(|user| HttpResponse::Ok().json(user))
            .map_err(|_| HttpResponse::InternalServerError())?
    )
}

fn db_get_user_by_id(pool: web::Data<Pool>, user_id: Uuid) -> Result<User, diesel::result::Error> {
    let conn = pool.get().unwrap();
    users.find(user_id).get_result::<User>(&conn)
}

#[derive(Debug, Serialize, Deserialize)]
pub struct InputUser {
    pub username: String,
    pub first_name: String,
    pub last_name: String,
    pub email: String
}

pub async fn add_user(db: web::Data<Pool>, item: web::Json<InputUser>) -> Result<HttpResponse, Error> {
    Ok(web::block(move || add_single_user(db, item))
        .await
        .map(|user| HttpResponse::Created().json(user))
        .map_err(|_| HttpResponse::InternalServerError())?
    )
}

fn add_single_user(
    db: web::Data<Pool>,
    item: web::Json<InputUser>,
) -> Result<User, diesel::result::Error> {
    let conn = db.get().unwrap();
    let new_user = NewUser {
        username: &item.username,
        first_name: &item.first_name,
        last_name: &item.last_name,
        email: &item.email,
        created_at: chrono::Local::now().naive_local(),
        updated_at: chrono::Local::now().naive_local(),
    };
    let res = insert_into(users).values(&new_user).get_result(&conn)?;
    Ok(res)
}

pub async fn delete_user(db: web::Data<Pool>, user_id: web::Path<String>) -> Result<HttpResponse, Error> {
    let user_uuid = Uuid::parse_str(&user_id.into_inner()).unwrap();
    Ok(
        web::block(move || delete_single_user(db, user_uuid))
            .await
            .map(|user| HttpResponse::Ok().json(user))
            .map_err(|_| HttpResponse::InternalServerError())?,
    )
}

fn delete_single_user(db: web::Data<Pool>, user_id: Uuid) -> Result<usize, diesel::result::Error> {
    let conn = db.get().unwrap();
    let count = delete(users.find(user_id)).execute(&conn)?;
    Ok(count)
}

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