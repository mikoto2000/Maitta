use tauri::State;

use crate::{database, models::TaskInfo, AppState};

#[tauri::command]
pub fn get_all_tasks(state: State<'_, AppState>) -> Vec<TaskInfo> {
    println!("👺: get_all_task!");
    let conn = state.conn.clone();
    database::get_all_tasks(&conn)
}

#[tauri::command]
pub fn get_task_by_id(state: State<'_, AppState>, id: i32) -> TaskInfo {
    println!("👺: get_task_by_id! : {}", id);
    let conn = state.conn.clone();
    database::get_task_by_id(&conn, id)
}

#[tauri::command]
pub fn execute_task(state: State<'_, AppState>, id: i32) -> Result<(), String> {
    println!("👺: execute_task! : {}", id);
    let conn = state.conn.clone();
    database::execute_task(&conn, id).unwrap();
    Ok(())
}

#[tauri::command]
pub fn delete_task(id: u32) -> Result<(), String> {
    println!("👺: delete_task! : {}", id);
    Ok(())
}

#[tauri::command]
pub fn create_task(
    state: State<'_, AppState>,
    task_name: String,
    display_number: i32,
) -> Result<(), String> {
    println!("👺: create_task! : {}, {}", task_name, display_number);
    let conn = state.conn.clone();

    database::create_task(&conn, task_name, display_number);

    Ok(())
}

#[tauri::command]
pub fn update_task(id: u32, task_name: String, display_number: u32) -> Result<TaskInfo, String> {
    println!("👺: update_task! : {}, {}, {}", id, task_name, display_number);
    Ok(TaskInfo {
        id: 3,
        name: "TaskC".to_string(),
        display_number: 3,
        history: [].to_vec(),
    })
}
