import { AppBar, Box, Stack, Toolbar } from "@mui/material";
import { MockService } from "../services/MockService";
import { Service } from "../services/Services";
import { useEffect, useState } from "react";
import { TaskInfo } from "../types";

import MenuIcon from '@mui/icons-material/Menu';

type TaskDetailProps = {
  service?: Service;
  taskId: number
};

export const TaskDetail: React.FC<TaskDetailProps> = ({ taskId, service = new MockService() }) => {

  const [taskInfo, setTaskInfo] = useState<TaskInfo | null>(null);

  useEffect(() => {
    const ti = service.getTaskById(1);
    setTaskInfo(ti);
  }, []);

  return (
    <>
      <AppBar>
        <Stack direction="row">
          <Box style={{flexGrow: "1"}}>{taskInfo?.name}</Box>
          <MenuIcon style={{flexGrow: "0"}} />
        </Stack>
      </AppBar>
      <Stack>
        <>
          {
            taskInfo?.history.map((e) => <Box>{e.toISOString()}</Box>)
          }
        </>
      </Stack>
    </>
  )
}
