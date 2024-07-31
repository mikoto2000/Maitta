// @generated automatically by Diesel CLI.

diesel::table! {
    task (id) {
        id -> Nullable<Integer>,
        task_name -> Text,
        display_number -> Integer,
    }
}

diesel::table! {
    task_history (id) {
        id -> Nullable<Integer>,
        task_id -> Integer,
        datetime -> Timestamp,
    }
}

diesel::joinable!(task_history -> task (task_id));

diesel::allow_tables_to_appear_in_same_query!(
    task,
    task_history,
);
