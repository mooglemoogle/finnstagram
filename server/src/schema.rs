table! {
    comments (id) {
        id -> Uuid,
        user_id -> Uuid,
        post_id -> Uuid,
        body -> Nullable<Text>,
        reply_to_id -> Nullable<Uuid>,
        created_at -> Timestamp,
    }
}

table! {
    media_items (id) {
        id -> Uuid,
        post_id -> Uuid,
        media_type -> Nullable<Text>,
        uri -> Nullable<Text>,
        live_uri -> Nullable<Text>,
        index -> Nullable<Int4>,
        created_at -> Timestamp,
    }
}

table! {
    posts (id) {
        id -> Uuid,
        user_id -> Uuid,
        caption -> Nullable<Text>,
        created_at -> Timestamp,
    }
}

table! {
    users (id) {
        id -> Uuid,
        username -> Text,
        first_name -> Text,
        last_name -> Text,
        email -> Text,
        created_at -> Timestamp,
        updated_at -> Timestamp,
    }
}

allow_tables_to_appear_in_same_query!(
    comments,
    media_items,
    posts,
    users,
);
