import { invoke } from "@tauri-apps/api/core";
import { DisplayMode, TaskInfo } from "../types";
import { Service } from "./Services";
import dayjs from "dayjs";
import { Store } from "@tauri-apps/plugin-store";

export class TauriService implements Service {
  private store = new Store("settings.dat");
  async saveDisplayMode(mode: DisplayMode) {
    this.store.set("displayMode", mode);
    this.store.save();
  }

  async getDisplayMode(): Promise<DisplayMode> {
    return await this.store.get<DisplayMode>("displayMode") as DisplayMode;
  }
  async getAllTasks(): Promise<TaskInfo[]> {
    const result: any[] = await invoke("get_all_tasks", {});
    const tasks = result.map((taskInfo: any) => {
      const history = taskInfo.history.slice(0, taskInfo.display_number).map((h: any) => dayjs(h))
      return {
        id: taskInfo.id,
        name: taskInfo.name,
        displayNumber: taskInfo.displa_number,
        history
      }
    });
    return tasks;
  }
  async getTaskById(id: number): Promise<TaskInfo> {
    const result: any = await invoke("get_task_by_id", { id });
    const history = result.history.map((h: any) => dayjs(h))
    return {
      id: result.id,
      name: result.name,
      displayNumber: result.display_number,
      history
    }
  }
  async executeTask(id: number): Promise<void> {
    invoke("execute_task", { id });
  }
  async deleteTask(id: number): Promise<void> {
    invoke("delete_task", { id });
  }
  async createTask(taskName: string, displayNumber: number): Promise<void> {
    invoke("create_task", { taskName, displayNumber });
  }
  async updateTask(id: number, taskName: string, displayNumber: number): Promise<void> {
    invoke("update_task", { id, taskName, displayNumber });
  }
}

