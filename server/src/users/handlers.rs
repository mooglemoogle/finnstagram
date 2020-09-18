use actix_web::{web, HttpResponse, Error};
use crate::models::{NewUser, User};
use crate::schema::users::dsl::*;
use crate::Pool;
use crate::diesel::QueryDsl;
use crate::diesel::RunQueryDsl;
use diesel::dsl::{delete, insert_into};
use serde::{Deserialize, Serialize};
use std::vec::Vec;
use uuid::{Uuid};

pub async fn get_users(db: web::Data<Pool>) -> Result<HttpResponse, Error> {
    Ok(web::block(move || get_all_users(db))
        .await
        .map(|user| HttpResponse::Ok().json(user))
        .map_err(|_| HttpResponse::InternalServerError())?
    )
}

fn get_all_users(pool: web::Data<Pool>) -> Result<Vec<User>, diesel::result::Error> {
    let conn = pool.get().unwrap();
    let items = users.load::<User>(&conn)?;
    Ok(items)
}

pub async fn get_user(db: web::Data<Pool>, user_id: web::Path<String>) -> Result<HttpResponse, Error> {
    let user_uuid = Uuid::parse_str(&user_id.into_inner()).unwrap();
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