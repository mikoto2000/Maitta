import { Dayjs } from "dayjs";

export type TaskInfo = {
  id: number;
  name: string;
  displayNumber: number;
  history: Dayjs[];
};

