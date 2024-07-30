use crate::models::{Task, TaskWithHistory};

#[tauri::command]
pub fn get_all_tasks() -> Vec<TaskWithHistory> {
    println!("👺: get_all_task!");
    [TaskWithHistory {
        id: 1,
        name: "TaskA".to_string(),
        history: [].to_vec(),
    }]
    .to_vec()
}

#[tauri::command]
pub fn get_task_by_id(id: u32) -> TaskWithHistory {
    println!("👺: get_task_by_id! : {}", id);
    TaskWithHistory {
        id: 2,
        name: "TaskB".to_string(),
        history: [].to_vec(),
    }
}

#[tauri::command]
pub fn execute_task(id: u32) -> Result<(), String> {
    println!("👺: execute_task! : {}", id);
    Ok(())
}

#[tauri::command]
pub fn delete_task(id: u32) -> Result<(), String> {
    println!("👺: delete_task! : {}", id);
    Ok(())
}

#[tauri::command]
pub fn create_task(name: String, display_number: u32) -> Result<(), String> {
    println!("👺: create_task! : {}, {}", name, display_number);
    Ok(())
}

#[tauri::command]
pub fn update_task(id: u32, name: String, display_number: u32) -> Result<Task, String> {
    println!("👺: update_task! : {}, {}, {}", id, name, display_number);
    Ok(Task {
        id: 3,
        name: "TaskC".to_string(),
        display_number: 3,
    })
}
