import { TaskInfo } from "../types";

export interface Service {
  getAllTasks(): TaskInfo[];
  getTaskById(id: number): TaskInfo;
  deleteTask(id: number): void;
  createTask(taskName: string, displayNumber: number): void;
  updateTask(id: number, taskName: string, displayNumber: number): void;
}
