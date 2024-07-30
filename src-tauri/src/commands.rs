use crate::models::TaskInfo;

#[tauri::command]
pub fn get_all_tasks() -> Vec<TaskInfo> {
    println!("👺: get_all_task!");
    [
        TaskInfo {
            id: 1,
            name: "TaskA".to_string(),
            display_number: 1,
            history: [
                "2024-07-30T00:00:00.000+09:00".to_string(),
                "2024-07-30T00:00:00.000+09:00".to_string(),
                "2024-07-30T00:00:00.000+09:00".to_string(),
                "2024-07-30T00:00:00.000+09:00".to_string(),
                "2024-07-30T00:00:00.000+09:00".to_string(),
                "2024-07-30T00:00:00.000+09:00".to_string(),
            ]
            .to_vec(),
        },
        TaskInfo {
            id: 2,
            name: "TaskB".to_string(),
            display_number: 2,
            history: [
                "2024-07-30T00:00:00.000+09:00".to_string(),
                "2024-07-30T00:00:00.000+09:00".to_string(),
                "2024-07-30T00:00:00.000+09:00".to_string(),
                "2024-07-30T00:00:00.000+09:00".to_string(),
                "2024-07-30T00:00:00.000+09:00".to_string(),
                "2024-07-30T00:00:00.000+09:00".to_string(),
            ]
            .to_vec(),
        },
        TaskInfo {
            id: 3,
            name: "TaskC".to_string(),
            display_number: 4,
            history: [
                "2024-07-30T00:00:00.000+09:00".to_string(),
                "2024-07-30T00:00:00.000+09:00".to_string(),
                "2024-07-30T00:00:00.000+09:00".to_string(),
                "2024-07-30T00:00:00.000+09:00".to_string(),
                "2024-07-30T00:00:00.000+09:00".to_string(),
                "2024-07-30T00:00:00.000+09:00".to_string(),
            ]
            .to_vec(),
        },
    ]
    .to_vec()
}

#[tauri::command]
pub fn get_task_by_id(id: u32) -> TaskInfo {
    println!("👺: get_task_by_id! : {}", id);
    TaskInfo {
        id: 4,
        name: "GetTaskByIdで取得したタスク".to_string(),
        display_number: 2,
        history: [
            "2024-07-30T00:00:00.000+09:00".to_string(),
            "2024-07-30T00:00:00.000+09:00".to_string(),
            "2024-07-30T00:00:00.000+09:00".to_string(),
            "2024-07-30T00:00:00.000+09:00".to_string(),
            "2024-07-30T00:00:00.000+09:00".to_string(),
            "2024-07-30T00:00:00.000+09:00".to_string(),
        ]
        .to_vec(),
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
pub fn update_task(id: u32, name: String, display_number: u32) -> Result<TaskInfo, String> {
    println!("👺: update_task! : {}, {}, {}", id, name, display_number);
    Ok(TaskInfo {
        id: 3,
        name: "TaskC".to_string(),
        display_number: 3,
        history: [].to_vec(),
    })
}
