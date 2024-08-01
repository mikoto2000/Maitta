import { Box } from "@mui/material";

import dayjs, { Dayjs } from "dayjs";
import timezone from 'dayjs/plugin/timezone'
import relativeTime from 'dayjs/plugin/relativeTime'

import React from "react";

dayjs.extend(timezone);
dayjs.extend(relativeTime);

type TaskHistoryItemProps = {
  datetime: Dayjs
};

const machineTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
const userLocale = navigator.language.split('-')[0];

import(`dayjs/locale/${userLocale}`)
  .then(() => {
    dayjs.locale(userLocale);
  })
  .catch(() => { })

export const TaskHistoryItem: React.FC<TaskHistoryItemProps> = ({ datetime }) => {

  const datetimeTz = datetime.tz(machineTimeZone);

  return (
    <Box>
      {datetimeTz.format()}{}({datetimeTz.fromNow()})
    </Box>
  )
}
