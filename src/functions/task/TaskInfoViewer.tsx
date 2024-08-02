import { Dayjs } from "dayjs";
import { TaskHistory } from "./TaskHistory";
import { Button, Divider, Grid, Stack } from "@mui/material";

import DoneIcon from '@mui/icons-material/Done';

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
      sx={{ cursor: "pointer" }}
      container
      onClick={onItemClick}
    >
      <Grid xs={5}>
        {name}
      </Grid>
      <Divider orientation="vertical" flexItem />
      <Grid xs={5}>
        <Stack
          direction="column"
          spacing={2}
        >
          <TaskHistory history={history.slice(0, displayNumber)} />
        </Stack>
      </Grid>
      <Divider orientation="vertical" flexItem />
      <Grid xs={2} style={{ margin: "-2px" }}>
        <Button sx={{ boxShadow: 0, height: "100%", width: "100%" }} onClick={(e) => {
          e.stopPropagation();
          onButtonClick()
        }}><DoneIcon sx={{ fontSize: "2em" }} /></Button>
      </Grid>
    </Grid>
  )
}
