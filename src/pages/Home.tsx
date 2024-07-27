import { useEffect, useState } from "react";
import { TaskInfo } from "../functions/task/TaskInfo";
import dayjs, { Dayjs } from "dayjs";
import { Divider, Stack } from "@mui/material";

type HomeProps = {
};

export const Home: React.FC<HomeProps> = ({ }) => {

  const [taskInfos, setTaskInfos] = useState<Array<{ name: string, history: Dayjs[] }>>([]);
  const [componentState, setComponentState] = useState<"initializing" | "complete">("initializing");

  useEffect(() => {
    (async () => {
      setTaskInfos([{
        name: "TaskA",
        history: [dayjs()],
      }, {
        name: "TaskB",
        history: [dayjs(), dayjs()],
      }, {
        name: "TaskC",
        history: [dayjs(), dayjs(), dayjs(), dayjs()],
      }]);
      setComponentState("complete");
    })()
  }, []);

  const render = () => {
    if (componentState !== "complete") {
      return <p>loading...</p>;
    }

    return (
      <Stack
        divider={<Divider flexItem />}
        spacing={2}
      >
        {taskInfos.map((e) => <TaskInfo name={e.name} history={e.history} />)}
      </Stack>
    )
  }

  return (render())
}
