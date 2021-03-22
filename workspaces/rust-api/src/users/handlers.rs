use actix_web::{web, HttpResponse, Responder};
use super::structs::{UserInfo, User};

pub async fn get_user(params: web::Path<UserInfo>) -> impl Responder {
    HttpResponse::Ok().json(User {
        id: params.userId.to_string(),
        username: "Test Username".to_string(),
        email: "chris@abysmalsoft.org".to_string(),
        firstName: "Chris".to_string(),
        lastName: "Rock".to_string(),
    })
}
