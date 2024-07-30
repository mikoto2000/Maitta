mod commands;
mod models;

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_shell::init())
        .invoke_handler(tauri::generate_handler![
            commands::get_all_tasks,
            commands::get_task_by_id,
            commands::execute_task,
            commands::delete_task,
            commands::create_task,
            commands::update_task
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
