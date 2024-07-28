import { TaskInfo } from "../types";

export interface Service {
  getAllTasks(): TaskInfo[];
  getTaskById(id: number): TaskInfo;
}
