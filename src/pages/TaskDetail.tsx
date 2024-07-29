import { AppBar, Box, Divider, Stack } from "@mui/material";
import { MockService } from "../services/MockService";
import { Service } from "../services/Services";
import { useEffect, useState } from "react";
import { TaskInfo } from "../types";
import { useNavigate, useParams } from "react-router";

import MenuIcon from '@mui/icons-material/Menu';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

type TaskDetailProps = {
  service?: Service;
};

export const TaskDetail: React.FC<TaskDetailProps> = ({ service = new MockService() }) => {

  const navigate = useNavigate();

  const [taskInfo, setTaskInfo] = useState<TaskInfo | null>(null);

  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    const ti = service.getTaskById(parseInt(id ?? "0"));
    setTaskInfo(ti);
  }, []);

  return (
    <>
      <AppBar sx={{ fontSize: "2em", height: "1em" }}>
        <Stack direction="row">
          <ArrowBackIcon
            sx={{ flexGrow: "0", fontSize: "1em" }}
            onClick={() => navigate(-1)}
          />
          <Box sx={{ flexGrow: "1" }}>{taskInfo?.name}</Box>
          <MenuIcon sx={{ flexGrow: "0", fontSize: "1em" }} />
        </Stack>
      </AppBar>
      <Stack
        divider={<Divider flexItem />}
        spacing={2}
      >
        {
          taskInfo?.history.map((e) => <Box>{e.format()}</Box>)
        }
      </Stack>
    </>
  )
}
