import dayjs from "dayjs";
import { TaskInfo } from "../types";
import { Service } from "./Services";

export class MockService implements Service {
  getAllTasks(): TaskInfo[] {
  return [{
    name: "TaskA",
    displayNumber: 1,
    history: [dayjs()],
  }, {
    name: "TaskB",
    displayNumber: 2,
    history: [dayjs(), dayjs()],
  }, {
    name: "TaskC",
    displayNumber: 4,
    history: [dayjs(), dayjs(), dayjs(), dayjs()],
  }]
}
}

