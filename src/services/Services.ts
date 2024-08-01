import { DisplayMode, TaskInfo } from "../types";

export interface Service {
  // Setting
  saveDisplayMode(mode: DisplayMode): Promise<void>;
  getDisplayMode(): Promise<DisplayMode>;
  // DB
  getAllTasks(): Promise<TaskInfo[]>;
  getTaskById(id: number): Promise<TaskInfo>;
  executeTask(id: number): Promise<void>;
  deleteTask(id: number): Promise<void>;
  createTask(taskName: string, displayNumber: number): Promise<void>;
  updateTask(id: number, taskName: string, displayNumber: number): Promise<void>;
}
