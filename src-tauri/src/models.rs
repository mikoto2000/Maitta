use diesel::prelude::Queryable;
use serde::{Deserialize, Serialize};

#[derive(Queryable, Deserialize, Serialize, Clone, Debug)]
#[diesel(table_name = task)]
pub struct Task {
    pub id: u32,
    pub name: String,
    pub display_number: u32,
}

#[derive(Queryable, Deserialize, Serialize, Clone, Debug)]
#[diesel(table_name = task)]
pub struct TaskWithHistory {
    pub id: u32,
    pub name: String,
    pub history: Vec<String>,
}
