use serde::{Deserialize, Serialize};

#[allow(non_snake_case)]
#[derive(Deserialize)]
pub struct UserInfo {
    pub userId: String,
}

#[allow(non_snake_case)]
#[derive(Serialize)]
pub struct User {
    pub id: String,
    pub username: String,
    pub email: String,
    pub firstName: String,
    pub lastName: String,
}