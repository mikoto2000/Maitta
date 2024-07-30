import { TaskInfo } from "../types";

export interface Service {
  getAllTasks(): Promise<TaskInfo[]>;
  getTaskById(id: number): Promise<TaskInfo>;
  executeTask(id: number): Promise<void>;
  deleteTask(id: number): Promise<void>;
  createTask(taskName: string, displayNumber: number): Promise<void>;
  updateTask(id: number, taskName: string, displayNumber: number): Promise<void>;
}
