use chrono::NaiveDateTime;
use diesel::{
    prelude::{Associations, Identifiable, Insertable, Queryable},
    Selectable,
};
use serde::{Deserialize, Serialize};

use crate::schema::{task, task_history};

#[derive(Queryable, Deserialize, Serialize, Clone, Debug)]
pub struct TaskInfo {
    pub id: i32,
    pub name: String,
    pub display_number: i32,
    pub history: Vec<String>,
}

#[derive(Insertable, Queryable, Deserialize, Serialize, Clone, Debug)]
#[diesel(table_name = task)]
pub struct CreateTaskParam {
    pub task_name: String,
    pub display_number: i32,
}

#[derive(
    Queryable, Identifiable, Selectable, Deserialize, Serialize, Clone, Debug, Hash, PartialEq, Eq,
)]
#[diesel(table_name = task)]
pub struct Task {
    pub id: Option<i32>,
    pub task_name: String,
    pub display_number: i32,
}

#[derive(
    Queryable, Selectable, Identifiable, Associations, Deserialize, Serialize, Clone, Debug,
)]
#[diesel(belongs_to(Task))]
#[diesel(table_name = task_history)]
pub struct TaskHistory {
    pub id: Option<i32>,
    pub task_id: i32,
    pub datetime: String,
}

#[derive(Insertable, Queryable, Deserialize, Serialize, Clone, Debug)]
#[diesel(table_name = task_history)]
pub struct ExecuteTaskParam {
    pub task_id: i32,
    pub datetime: NaiveDateTime,
}
