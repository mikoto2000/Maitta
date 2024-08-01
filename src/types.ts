import { Dayjs } from "dayjs";

export type DisplayMode = 'dark' | 'light';

export type TaskInfo = {
  id: number;
  name: string;
  displayNumber: number;
  history: Dayjs[];
};

