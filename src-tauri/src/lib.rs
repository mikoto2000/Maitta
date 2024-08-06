use std::sync::{Arc, Mutex};

use diesel::SqliteConnection;
use diesel_migrations::{embed_migrations, EmbeddedMigrations, MigrationHarness};
use tauri::Manager;

mod commands;
mod database;
mod models;
mod schema;

pub const MIGRATIONS: EmbeddedMigrations = embed_migrations!();

struct AppState {
    conn: Arc<Mutex<SqliteConnection>>,
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    let builder = tauri::Builder::default()
        .setup(|app| {
            // DB コネクションを貼って State として管理してもらう
            let app_local_data_dir = app.path().app_local_data_dir().unwrap();
            let db_path = app_local_data_dir.join("worklog.db");
            let mut conn = database::establish_connection(db_path.to_str().unwrap().to_string());

            let _ = conn.run_pending_migrations(MIGRATIONS);

            app.manage(AppState {
                conn: Arc::new(Mutex::new(conn)),
            });

            Ok(())
        })
        .plugin(tauri_plugin_shell::init())
        .plugin(tauri_plugin_store::Builder::default().build())
        .invoke_handler(tauri::generate_handler![
            commands::get_all_tasks,
            commands::get_task_by_id,
            commands::execute_task,
            commands::delete_task,
            commands::create_task,
            commands::update_task
        ]);

    #[cfg(desktop)]
    {
        builder
            .plugin(tauri_plugin_window_state::Builder::default().build())
            .run(tauri::generate_context!())
            .expect("error while running tauri application");
    }

    #[cfg(mobile)]
    {
        builder
            .run(tauri::generate_context!())
            .expect("error while running tauri application");
    }
}
