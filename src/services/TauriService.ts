import { invoke } from "@tauri-apps/api/core";
import { TaskInfo } from "../types";
import { Service } from "./Services";
import dayjs from "dayjs";

export class TauriService implements Service {
  async getAllTasks(): Promise<TaskInfo[]> {
    const result: any[] = await invoke("get_all_tasks", {});
    const tasks = result.map((taskInfo: any) => {
      const history = taskInfo.history.slice(0, taskInfo.display_number).map((h: any) => dayjs(h))
      return {
        id: taskInfo.id,
        name: taskInfo.name,
        displayNumber: taskInfo.displayNumber,
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
      displayNumber: result.displayNumber,
      history
    }
  }
  async executeTask(_id: number): Promise<void> {
    throw new Error("Method not implemented.");
  }
  async deleteTask(_id: number): Promise<void> {
    throw new Error("Method not implemented.");
  }
  async createTask(_taskName: string, _displayNumber: number): Promise<void> {
    throw new Error("Method not implemented.");
  }
  async updateTask(_id: number, _taskName: string, _displayNumber: number): Promise<void> {
    throw new Error("Method not implemented.");
  }
}

