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

  async checkAuth(): Promise<void> {
    await this.requestJson<void>("/api/auth/status");
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
    if (!this.getCsrfToken() && this.requiresCsrf(init)) {
      await this.ensureCsrfToken();
    }

    const response = await fetch(`${this.baseUrl}${path}`, {
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        ...(this.getCsrfHeader() ?? {}),
        ...(init.headers ?? {}),
      },
      ...init,
    });

    if (!response.ok) {
      if (response.status === 401) {
        window.location.href = "/login";
        throw new Error("Unauthorized");
      }
      const body = await response.text();
      throw new Error(`Request failed: ${response.status} ${response.statusText} ${body}`);
    }

    if (response.status === 204) {
      return undefined as T;
    }

    return response.json() as Promise<T>;
  }

  private requiresCsrf(init: RequestInit): boolean {
    const method = (init.method ?? "GET").toUpperCase();
    return method !== "GET" && method !== "HEAD" && method !== "OPTIONS";
  }

  private getCsrfToken(): string | null {
    const match = document.cookie.match(/(?:^|; )XSRF-TOKEN=([^;]*)/);
    return match ? decodeURIComponent(match[1]) : null;
  }

  private getCsrfHeader(): Record<string, string> | null {
    const token = this.getCsrfToken();
    if (!token) {
      return null;
    }
    return { "X-XSRF-TOKEN": token };
  }

  private async ensureCsrfToken(): Promise<void> {
    await fetch(`${this.baseUrl}/api/csrf`, { credentials: "include" });
  }
}
