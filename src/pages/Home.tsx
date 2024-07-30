import { useEffect, useState } from "react";
import { TaskInfoViewer } from "../functions/task/TaskInfoViewer.tsx";
import { Divider, Stack, styled } from "@mui/material";

import AddCircleIcon from '@mui/icons-material/AddCircle';

import { TaskInfo } from '../types.ts';
import { Service } from "../services/Services.ts";
import { useNavigate } from "react-router";
import { TaskCreateDialog } from "../functions/task/TaskCreateDialog.tsx";
import { TauriService } from "../services/TauriService.ts";

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

export const Home: React.FC<HomeProps> = ({ service = new TauriService() }) => {

  const [taskInfos, setTaskInfos] = useState<TaskInfo[]>([]);
  const [componentState, setComponentState] = useState<"initializing" | "complete">("initializing");

  const [showTaskCreateDialog, setShowTaskCreateDialog] = useState<boolean>(false);

  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      setTaskInfos(await service.getAllTasks());
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
          {taskInfos.map((e) => <TaskInfoViewer
            onItemClick={() => {
              navigate(`/tasks/${e.id}`)
            }}
            onButtonClick={async () => {
              await service.executeTask(e.id);
              // TODO: 実行したタスクだけ再描画できたらいいね
              setTaskInfos(await service.getAllTasks());
            }}
            name={e.name}
            displayNumber={e.displayNumber}
            history={e.history} />)}
        </Stack>

        <StyledAddCircleIcon
          onClick={() => { setShowTaskCreateDialog(true) }}

        />

        <TaskCreateDialog
          service={service}
          show={showTaskCreateDialog}
          onClose={() => { setShowTaskCreateDialog(false) }}
          onCreated={async () => { setTaskInfos(await service.getAllTasks()) }}
        />
      </>
    )
  }

  return (render())
}
