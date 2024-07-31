import { Box } from "@mui/material";

import dayjs, { Dayjs } from "dayjs";
import timezone from 'dayjs/plugin/timezone'

import React from "react";

dayjs.extend(timezone);
dayjs.tz.setDefault('Asia/Tokyo');

type TaskHistoryItemProps = {
  datetime: Dayjs
};

const machineTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

export const TaskHistoryItem: React.FC<TaskHistoryItemProps> = ({ datetime }) => {
  return (
    <Box>
      {datetime.tz(machineTimeZone).format()}
    </Box>
  )
}
