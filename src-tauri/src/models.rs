use diesel::prelude::Queryable;
use serde::{Deserialize, Serialize};

#[derive(Queryable, Deserialize, Serialize, Clone, Debug)]
#[diesel(table_name = task)]
pub struct TaskInfo {
    pub id: u32,
    pub name: String,
    pub display_number: u32,
    pub history: Vec<String>,
}

