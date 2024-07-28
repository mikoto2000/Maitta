import { TaskInfo } from "../types";

export interface Service {
  getAllTasks(): TaskInfo[];
}
