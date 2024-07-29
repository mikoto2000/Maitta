import { useEffect, useState } from "react";
import { TaskInfoViewer } from "../functions/task/TaskInfoViewer.tsx";
import { Divider, Stack, styled } from "@mui/material";

import AddCircleIcon from '@mui/icons-material/AddCircle';

import { TaskInfo } from '../types.ts';
import { Service } from "../services/Services.ts";
import { MockService } from "../services/MockService.ts";
import { useNavigate } from "react-router";

const StyledAddCircleIcon = styled(AddCircleIcon)(({ theme }) => ({
  fontSize: "3em",
  position: "fixed",
  bottom: "0.3em",
  right: "0.3em",
  color: theme.palette.primary.main,
}));

type HomeProps = {
  service?: Service;
};

export const Home: React.FC<HomeProps> = ({ service = new MockService() }) => {

  const [taskInfos, setTaskInfos] = useState<TaskInfo[]>([]);
  const [componentState, setComponentState] = useState<"initializing" | "complete">("initializing");

  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      setTaskInfos(service.getAllTasks());
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
          {taskInfos.map((e) => <TaskInfoViewer onClick={() => { navigate(`/tasks/${e.id}`) }} name={e.name} displayNumber={e.displayNumber} history={e.history} />)}
        </Stack>

        <StyledAddCircleIcon />
      </>
    )
  }

  return (render())
}
