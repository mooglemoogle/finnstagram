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
