import { Dayjs } from "dayjs";
import { TaskHistory } from "./TaskHistory";
import { Box, Button, Divider, Stack } from "@mui/material";

type TaskInfoProps = {
  name: string;
  history: Dayjs[];
};

export const TaskInfo: React.FC<TaskInfoProps> = ({ name, history }) => {

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
        <TaskHistory history={history} />
      </Stack>
      <Button>やったよ！</Button>
    </Stack>
  )
}
