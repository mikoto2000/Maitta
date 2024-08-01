import { ThemeProvider } from "@emotion/react";
import "./App.css";
import { Home } from "./pages/Home";
import { CssBaseline, styled } from "@mui/material";
import { TaskDetail } from "./pages/TaskDetail";
import { Route, Routes } from "react-router";

import dayjs from "dayjs";
import timezone from 'dayjs/plugin/timezone'
import utc from 'dayjs/plugin/utc'
import { useEffect, useState } from "react";
import { DisplayMode } from "./types";
import { Service } from "./services/Services";
import { TauriService } from "./services/TauriService";
import { theme } from "./theme";

import { MaterialUISwitch } from "./functions/displayMode/MaterialUISwitch";

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.tz.setDefault(dayjs.tz.guess());

const StyledMaterialUISwitch = styled(MaterialUISwitch)(({ theme }) => ({
  fontSize: "4em",
  position: "fixed",
  bottom: "0.3em",
  left: "0.3em",
  color: theme.palette.primary.main,
}));

export type AppProps = {
  service?: Service;
}

function App({ service = new TauriService() }) {
  const [currentDisplayMode, setCurrentDisplayMode] = useState<DisplayMode>('light');

  useEffect(() => {
    (async () => {
      const mode = await service.getDisplayMode() ?? "light";
      setCurrentDisplayMode(mode);
    })();
  }, []);

  return (

    <div className="container">

      <ThemeProvider theme={theme(currentDisplayMode)}>
        <CssBaseline />
        <Routes>
          <Route path="/" element={<Home service={service} />} />
          <Route path="/tasks/:id" element={<TaskDetail service={service} />} />
        </Routes>
        <StyledMaterialUISwitch
          checked={currentDisplayMode === 'light' ? false : true}
          onChange={(event) => {
            console.log(event);
            const mode = event.currentTarget.checked ? 'dark' : 'light';
            setCurrentDisplayMode(mode);
            service.saveDisplayMode(mode)
          }}
        />
      </ThemeProvider>
    </div>
  );
}

export default App;
