use chrono::Local;
use dotenv::dotenv;
use std::cmp::Ordering;
use std::collections::HashMap;
use std::env;
use std::sync::{Arc, Mutex};

use diesel::{
    Connection, ExpressionMethods, QueryDsl, RunQueryDsl, SelectableHelper, SqliteConnection,
};

use crate::models::{ExecuteTaskParam, Task, TaskHistory, TaskInfo};
use crate::{
    models::CreateTaskParam, schema::task::dsl::task, schema::task_history::dsl::task_history,
};

pub fn establish_connection(default_database_url: String) -> SqliteConnection {
    dotenv().ok();

    let database_url = env::var("DATABASE_URL").unwrap_or(default_database_url);
    SqliteConnection::establish(&database_url)
        .unwrap_or_else(|_| panic!("Error connecting to {}", database_url))
}

pub fn get_all_tasks(conn: &Arc<Mutex<SqliteConnection>>) -> Vec<TaskInfo> {
    let mut conn = conn.lock().unwrap();

    let tasks = crate::schema::task::table
        .left_join(crate::schema::task_history::table)
        .select((Task::as_select(), Option::<TaskHistory>::as_select()))
        .load::<(Task, Option<TaskHistory>)>(&mut *conn)
        .unwrap();

    let grouped_tasks = tasks.into_iter().fold(HashMap::new(), |mut acc, (t, h)| {
        acc.entry(t).or_insert(Vec::new()).push(h);
        acc
    });

    // TaskInfo の形に変換して返却
    let mut result: Vec<TaskInfo> = grouped_tasks
        .into_iter()
        .map(|(k, v)| {
            let mut history: Vec<String> = v
                .into_iter()
                .filter_map(|e| e.map(|t| t.datetime))
                .collect();
            history.sort();
            history.reverse();
            TaskInfo {
                id: k.id.unwrap(),
                name: k.task_name,
                display_number: k.display_number,
                history,
            }
        })
        .collect();

    result.sort_by(|a, b| {
        if a.history.is_empty() && !b.history.is_empty() {
            Ordering::Less
        } else if !a.history.is_empty() && b.history.is_empty() {
            Ordering::Greater
        } else if a.history.is_empty() && b.history.is_empty() {
            Ordering::Equal
        } else {
            b.history[0].cmp(&(a.history[0]))
        }
    });
    result
}

pub fn get_task_by_id(conn: &Arc<Mutex<SqliteConnection>>, id: i32) -> TaskInfo {
    let mut conn = conn.lock().unwrap();

    let tasks = crate::schema::task::table
        .filter(crate::schema::task::dsl::id.eq(id))
        .left_join(crate::schema::task_history::table)
        .select((Task::as_select(), Option::<TaskHistory>::as_select()))
        .load::<(Task, Option<TaskHistory>)>(&mut *conn)
        .unwrap();

    let grouped_tasks = tasks.into_iter().fold(HashMap::new(), |mut acc, (t, h)| {
        acc.entry(t).or_insert(Vec::new()).push(h);
        acc
    });

    // TaskInfo の形に変換して返却
    let result: Vec<TaskInfo> = grouped_tasks
        .into_iter()
        .map(|(k, v)| {
            let mut history: Vec<String> = v
                .into_iter()
                .filter_map(|e| e.map(|t| t.datetime))
                .collect();
            history.sort();
            history.reverse();
            TaskInfo {
                id: k.id.unwrap(),
                name: k.task_name,
                display_number: k.display_number,
                history,
            }
        })
        .collect();

    result.first().unwrap().clone()
}

pub fn create_task(conn: &Arc<Mutex<SqliteConnection>>, task_name: String, display_number: i32) {
    let new_task = CreateTaskParam {
        task_name,
        display_number,
    };

    let mut conn = conn.lock().unwrap();

    diesel::insert_into(task)
        .values(&new_task)
        .execute(&mut *conn)
        .expect("Error saving new task");
}

pub fn execute_task(conn: &Arc<Mutex<SqliteConnection>>, id: i32) -> Result<(), String> {
    let mut conn = conn.lock().unwrap();

    let now = Local::now();
    let datetime = now.naive_local();

    diesel::insert_into(task_history)
        .values(ExecuteTaskParam {
            task_id: id,
            datetime,
        })
        .execute(&mut *conn)
        .expect("Error saving new task history");

    Ok(())
}
