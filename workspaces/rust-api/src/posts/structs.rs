use serde::{Deserialize, Serialize};

#[allow(non_snake_case)]
#[derive(Serialize)]
pub struct MediaItem {
    pub id: String,
    pub postId: String,
    pub createdDate: String,
    pub uri: String,
    pub liveUri: Option<String>,
}

#[allow(non_snake_case)]
#[derive(Serialize)]
pub struct Post {
    pub id: String,
    pub userId: String,
    pub createdDate: String,
    pub caption: String,
    pub likes: i32,
    pub mediaItems: Vec<MediaItem>,
    pub comments: Vec<Comment>,
}

#[allow(non_snake_case)]
#[derive(Deserialize)]
pub struct CreatePost {
    pub userId: String,
    pub caption: String,
    pub image: String,
    pub live: String,
}

#[allow(non_snake_case)]
#[derive(Deserialize, Serialize)]
pub struct Comment {
    pub id: String,
    pub userId: String,
    pub postId: String,
    pub createdDate: String,
    pub body: String,
    pub replyToId: Option<String>,
}