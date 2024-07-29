import dayjs from "dayjs";
import { TaskInfo } from "../types";
import { Service } from "./Services";

export class MockService implements Service {
  getAllTasks(): TaskInfo[] {
    return [{
      id: 1,
      name: "TaskA",
      displayNumber: 1,
      history: [dayjs.tz()],
    }, {
      id: 2,
      name: "TaskB",
      displayNumber: 2,
      history: [dayjs.tz(), dayjs.tz()],
    }, {
      id: 3,
      name: "TaskC",
      displayNumber: 4,
      history: [dayjs.tz(), dayjs.tz(), dayjs.tz(), dayjs.tz()],
    }]
  }
  getTaskById(id: number): TaskInfo {
    if (id === 1) {
      return {
        id: 1,
        name: "taskA",
        displayNumber: 1,
        history: [dayjs.tz(), dayjs.tz(), dayjs.tz(), dayjs.tz(), dayjs.tz(), dayjs.tz(), dayjs.tz(), dayjs.tz()]
      }
    } else if (id === 2) {
      return {
        id: 2,
        name: "taskB",
        displayNumber: 2,
        history: [dayjs.tz(), dayjs.tz(), dayjs.tz(), dayjs.tz(), dayjs.tz(), dayjs.tz(), dayjs.tz(), dayjs.tz()]
      }
    } else if (id === 3) {
      return {
        id: 3,
        name: "taskC",
        displayNumber: 4,
        history: [dayjs.tz(), dayjs.tz(), dayjs.tz(), dayjs.tz(), dayjs.tz(), dayjs.tz(), dayjs.tz(), dayjs.tz()]
      }
    } else {
      return {
        id: 0,
        name: "N/A",
        displayNumber: 0,
        history: []
      }
    }
  }

  deleteTask(_id: number): void {
  }

  updateTask(_id: number, _taskName: string, _displayNumber: number): void {
  }
}

