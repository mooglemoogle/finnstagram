use crate::schema::*;
use serde::{Deserialize, Serialize};
use uuid::Uuid;

#[derive(Debug, Serialize, Deserialize, Queryable)]
pub struct User {
    pub id: Uuid,
    pub username: String,
    pub first_name: String,
    pub last_name: String,
    pub email: String,
    pub created_at: chrono::NaiveDateTime,
    pub updated_at: chrono::NaiveDateTime,
}

#[derive(Insertable, Debug)]
#[table_name = "users"]
pub struct NewUser<'a> {
    pub username: &'a str,
    pub first_name: &'a str,
    pub last_name: &'a str,
    pub email: &'a str,
    pub created_at: chrono::NaiveDateTime,
    pub updated_at: chrono::NaiveDateTime,
}

#[derive(Debug, Serialize, Deserialize, Queryable)]
pub struct MediaItem {
    pub id: Uuid,
    pub post_id: Uuid,
    pub media_type: String,
    pub uri: String,
    pub live_uri: Option<String>,
    pub index: i32,
    pub created_at: chrono::NaiveDateTime,
}

#[derive(Insertable, Debug)]
#[table_name = "media_items"]
pub struct NewMediaItem<'a> {
    pub post_id: Uuid,
    pub media_type: &'a str,
    pub uri: &'a str,
    pub live_uri: Option<&'a str>,
    pub index: i32,
    pub created_at: chrono::NaiveDateTime,
}

#[derive(Debug, Serialize, Deserialize, Queryable)]
pub struct Post {
    pub id: Uuid,
    pub user_id: Uuid,
    pub caption: String,
    pub likes: i32,
    pub media_items: Vec<MediaItem>,
    pub comments: Vec<Comment>,
    pub created_at: chrono::NaiveDateTime,
}

#[derive(Insertable, Debug)]
#[table_name = "posts"]
pub struct NewPost<'a> {
    pub user_id: Uuid,
    pub caption: &'a str,
    pub created_at: chrono::NaiveDateTime,
}

#[derive(Debug, Serialize, Deserialize, Queryable)]
pub struct Comment {
    pub id: Uuid,
    pub user_id: Uuid,
    pub post_id: Uuid,
    pub body: String,
    pub reply_to_id: Option<Uuid>,
    pub created_at: chrono::NaiveDateTime,
}

#[derive(Insertable, Debug)]
#[table_name = "comments"]
pub struct NewComment<'a> {
    pub user_id: Uuid,
    pub post_id: Uuid,
    pub body: &'a str,
    pub reply_to_id: Option<Uuid>,
    pub created_at: chrono::NaiveDateTime,
}