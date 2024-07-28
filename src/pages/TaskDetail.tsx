import { AppBar, Box, Stack } from "@mui/material";
import { MockService } from "../services/MockService";
import { Service } from "../services/Services";
import { Dayjs } from "dayjs";

type TaskDetailProps = {
  service?: Service;
  taskName: string;
  history: Dayjs[];

};

export const TaskDetail: React.FC<TaskDetailProps> = ({ taskName, history, service = new MockService() }) => {


  return (
    <>
      <AppBar>{taskName}</AppBar>
      <Stack>
        <>
          {
            history.map((e) => <Box>e.toString()</Box>)
          }
        </>
      </Stack>
    </>
  )
}
