import { useEffect, useState } from "react";
import { TaskInfoViewer } from "../functions/task/TaskInfoViewer.tsx";
import { Box, Button, Divider, Stack, styled } from "@mui/material";

import AddCircleIcon from '@mui/icons-material/AddCircle';

import { TaskInfo } from '../types.ts';
import { Service } from "../services/Services.ts";
import { useNavigate } from "react-router";
import { TaskCreateDialog } from "../functions/task/TaskCreateDialog.tsx";
import { TauriService } from "../services/TauriService.ts";
import { Header } from "../commons/Header.tsx";

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
  const [loginUser, setLoginUser] = useState<string>("");

  const [showTaskCreateDialog, setShowTaskCreateDialog] = useState<boolean>(false);

  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      setTaskInfos(await service.getAllTasks());
      setComponentState("complete");
    })()
  }, []);

  useEffect(() => {
    (async () => {
      setLoginUser(await service.getLoginUser());
    })();
  }, []);

  const render = () => {
    if (componentState !== "complete") {
      return <p>loading...</p>;
    }

    return (
      <>
        <Header>
          <Stack direction="row" alignItems="center">
            <Box sx={{ flexGrow: "1" }}>Maitta (<b>Ma</b>e <b>i</b>tsu ya<b>tta</b>?)</Box>
            <Stack direction="row" spacing={1} alignItems="center">
              <Box sx={{ fontSize: "0.8em" }}>{loginUser}</Box>
              <Button
                size="small"
                variant="outlined"
                color="inherit"
                sx={{ borderColor: "rgba(255,255,255,0.7)" }}
                onClick={async () => {
                  await service.logout();
                }}
              >
                ログアウト
              </Button>
            </Stack>
          </Stack>
        </Header>
        {taskInfos.map((e) => <>
          <TaskInfoViewer
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
            history={e.history} />
          <Divider />
        </>
        )}

        <StyledAddCircleIcon
          sx={{ cursor: "pointer" }}
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
