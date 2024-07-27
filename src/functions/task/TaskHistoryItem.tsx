import { Box } from "@mui/material";
import { Dayjs } from "dayjs";
import React from "react";

type TaskHistoryItemProps = {
  datetime: Dayjs
};

export const TaskHistoryItem: React.FC<TaskHistoryItemProps> = ({ datetime }) => {
  return (
    <Box>
      {datetime.toISOString()}
    </Box>
  )
}
