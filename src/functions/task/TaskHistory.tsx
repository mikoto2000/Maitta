import { Dayjs } from "dayjs";
import { TaskHistoryItem } from "./TaskHistoryItem";

type TaskHistoryProps = {
  history: Dayjs[];
};

export const TaskHistory: React.FC<TaskHistoryProps> = ({ history }) => {


  return (
    <>
      {history.map((e) => <TaskHistoryItem datetime={e} />)}
    </>
  )
}
