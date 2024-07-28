import { useEffect, useState } from "react";
import { TaskInfo } from "../functions/task/TaskInfo";
import dayjs, { Dayjs } from "dayjs";
import { Divider, Stack, styled } from "@mui/material";

import AddCircleIcon from '@mui/icons-material/AddCircle';

const StyledAddCircleIcon = styled(AddCircleIcon)(({ theme }) => ({
  fontSize: "3em",
  position: "fixed",
  bottom: "0.3em",
  right: "0.3em",
  color: theme.palette.primary.main,
}));

type HomeProps = {
};

export const Home: React.FC<HomeProps> = ({ }) => {

  const [taskInfos, setTaskInfos] = useState<Array<{ name: string, displayNumber: number, history: Dayjs[] }>>([]);
  const [componentState, setComponentState] = useState<"initializing" | "complete">("initializing");

  useEffect(() => {
    (async () => {
      setTaskInfos([{
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
      }]);
      setComponentState("complete");
    })()
  }, []);

  const render = () => {
    if (componentState !== "complete") {
      return <p>loading...</p>;
    }

    return (
      <>
        <Stack
          divider={<Divider flexItem />}
          spacing={2}
        >
          {taskInfos.map((e) => <TaskInfo name={e.name} displayNumber={e.displayNumber} history={e.history} />)}
        </Stack>

        <StyledAddCircleIcon />
      </>
    )
  }

  return (render())
}
