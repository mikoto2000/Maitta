import { Dayjs } from "dayjs";
import { TaskHistory } from "./TaskHistory";
import { Box, Button, Divider, Grid, Stack } from "@mui/material";

type TaskInfoViewerProps = {
  name: string;
  displayNumber: number;
  history: Dayjs[];
  onItemClick: () => void;
  onButtonClick: () => void;
};

export const TaskInfoViewer: React.FC<TaskInfoViewerProps> = ({ name, displayNumber, history, onItemClick, onButtonClick }) => {

  return (
    <Grid
      container
      onClick={onItemClick}
    >
      <Grid xs={3}>
        {name}
      </Grid>
      <Divider orientation="vertical" flexItem />
      <Grid xs={7}>
        <Stack
          direction="column"
          spacing={2}
        >
          <TaskHistory history={history.slice(0, displayNumber)} />
        </Stack>
      </Grid>
      <Divider orientation="vertical" flexItem />
      <Grid xs={2} style={{ margin: "-2px" }}>
        <Button sx={{ boxShadow: 0 }} onClick={(e) => {
          e.stopPropagation();
          onButtonClick()
        }}>やったよ！</Button>
      </Grid>
    </Grid>
  )
}
