import { Dayjs } from "dayjs";
import { TaskHistory } from "./TaskHistory";
import { Box, Button, Divider, Stack } from "@mui/material";

type TaskInfoViewerProps = {
  name: string;
  displayNumber: number;
  history: Dayjs[];
  onItemClick: () => void;
  onButtonClick: () => void;
};

export const TaskInfoViewer: React.FC<TaskInfoViewerProps> = ({ name, displayNumber, history, onItemClick, onButtonClick }) => {

  return (
    <Stack
      direction="row"
      divider={<Divider orientation="vertical" flexItem />}
      spacing={3}
      onClick={onItemClick}
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
      <Button onClick={(e) => {
        e.stopPropagation();
        onButtonClick()
      }}>やったよ！</Button>
    </Stack>
  )
}
