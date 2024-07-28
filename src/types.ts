import { Dayjs } from "dayjs";

export type TaskInfo = {
  name: string;
  displayNumber: number;
  history: Dayjs[];
};

