import dayjs from "dayjs";
import { TaskInfo } from "../types";
import { Service } from "./Services";

export class MockService implements Service {
  getAllTasks(): TaskInfo[] {
    return [{
      id: 1,
      name: "TaskA",
      displayNumber: 1,
      history: [dayjs()],
    }, {
      id: 2,
      name: "TaskB",
      displayNumber: 2,
      history: [dayjs(), dayjs()],
    }, {
      id: 3,
      name: "TaskC",
      displayNumber: 4,
      history: [dayjs(), dayjs(), dayjs(), dayjs()],
    }]
  }
  getTaskById(id: number): TaskInfo {
    return {
      id: 1,
      name: "taskA",
      displayNumber: 4,
      history: [dayjs(), dayjs(), dayjs(), dayjs(), dayjs(), dayjs(), dayjs(), dayjs()]
    }
  }
}

