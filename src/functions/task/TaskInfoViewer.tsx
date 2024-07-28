import { Dayjs } from "dayjs";
import { TaskHistory } from "./TaskHistory";
import { Box, Button, Divider, Stack } from "@mui/material";

type TaskInfoViewerProps = {
  name: string;
  displayNumber: number;
  history: Dayjs[];
};

export const TaskInfoViewer: React.FC<TaskInfoViewerProps> = ({ name, displayNumber, history }) => {

  return (
    <Stack
      direction="row"
      divider={<Divider orientation="vertical" flexItem />}
      spacing={3}
    >
      <Box
        alignItems="center"
        style={{ flexGrow: "1" }}
      >{name}</Box>
      <Stack
        direction="column"
        spacing={2}
        style={{ flexGrow: "1" }}
      >
        <TaskHistory history={history.slice(0, displayNumber)} />
      </Stack>
      <Button>やったよ！</Button>
    </Stack>
  )
}