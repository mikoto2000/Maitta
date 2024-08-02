import { Box } from "@mui/material";

import dayjs, { Dayjs } from "dayjs";
import timezone from 'dayjs/plugin/timezone'
import relativeTime from 'dayjs/plugin/relativeTime'

import React from "react";

import "dayjs/locale/ja"

const machineTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
const userLocale = navigator.language.split('-')[0];

dayjs.extend(timezone);
dayjs.extend(relativeTime);
dayjs.locale(userLocale);

type TaskHistoryItemProps = {
  datetime: Dayjs
};

export const TaskHistoryItem: React.FC<TaskHistoryItemProps> = ({ datetime }) => {

  const datetimeTz = datetime.tz(machineTimeZone);

  return (
    <Box>
      {datetimeTz.fromNow()}
    </Box>
  )
}
