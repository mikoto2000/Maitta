import { ThemeProvider } from "@emotion/react";
import "./App.css";
import { Home } from "./pages/Home";
import { createTheme } from "@mui/material";
import { TaskDetail } from "./pages/TaskDetail";
import dayjs from "dayjs";

function App() {

  const theme = createTheme();

  return (

    <div className="container">

      <ThemeProvider theme={theme}>
        <Home />
      </ThemeProvider>

    </div>
  );
}

export default App;
