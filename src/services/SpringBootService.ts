import dayjs from "dayjs";
import { DisplayMode, TaskInfo } from "../types";
import { Service } from "./Services";

type TaskInfoResponse = {
  id: number;
  name: string;
  displayNumber: number;
  history: string[];
};

export class SpringBootService implements Service {
  private baseUrl: string;
  private displayModeKey = "displayMode";

  constructor(baseUrl: string = (import.meta as any).env?.VITE_API_BASE_URL ?? "http://localhost:8080") {
    this.baseUrl = baseUrl.replace(/\/+$/, "");
  }

  async saveDisplayMode(mode: DisplayMode): Promise<void> {
    localStorage.setItem(this.displayModeKey, mode);
  }

  async getDisplayMode(): Promise<DisplayMode> {
    const mode = localStorage.getItem(this.displayModeKey) as DisplayMode | null;
    return mode ?? "light";
  }

  async getAllTasks(): Promise<TaskInfo[]> {
    const tasks = await this.requestJson<TaskInfoResponse[]>("/api/tasks");
    return tasks.map((task) => ({
      id: task.id,
      name: task.name,
      displayNumber: task.displayNumber,
      history: task.history.map((h) => dayjs(h)),
    }));
  }

  async getTaskById(id: number): Promise<TaskInfo> {
    const task = await this.requestJson<TaskInfoResponse>(`/api/tasks/${id}`);
    return {
      id: task.id,
      name: task.name,
      displayNumber: task.displayNumber,
      history: task.history.map((h) => dayjs(h)),
    };
  }

  async executeTask(id: number): Promise<void> {
    await this.requestJson<void>(`/api/tasks/${id}/execute`, { method: "POST" });
  }

  async deleteTask(id: number): Promise<void> {
    await this.requestJson<void>(`/api/tasks/${id}`, { method: "DELETE" });
  }

  async createTask(taskName: string, displayNumber: number): Promise<void> {
    await this.requestJson<void>("/api/tasks", {
      method: "POST",
      body: JSON.stringify({ taskName, displayNumber }),
    });
  }

  async updateTask(id: number, taskName: string, displayNumber: number): Promise<void> {
    await this.requestJson<void>(`/api/tasks/${id}`, {
      method: "PUT",
      body: JSON.stringify({ taskName, displayNumber }),
    });
  }

  private async requestJson<T>(path: string, init: RequestInit = {}): Promise<T> {
    const response = await fetch(`${this.baseUrl}${path}`, {
      headers: {
        "Content-Type": "application/json",
        ...(init.headers ?? {}),
      },
      ...init,
    });

    if (!response.ok) {
      const body = await response.text();
      throw new Error(`Request failed: ${response.status} ${response.statusText} ${body}`);
    }

    if (response.status === 204) {
      return undefined as T;
    }

    return response.json() as Promise<T>;
  }
}
