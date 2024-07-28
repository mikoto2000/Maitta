import { ThemeProvider } from "@emotion/react";
import "./App.css";
import { Home } from "./pages/Home";
import { createTheme } from "@mui/material";
import { TaskDetail } from "./pages/TaskDetail";
import { Route, Routes } from "react-router";

function App() {

  const theme = createTheme();

  return (

    <div className="container">

      <ThemeProvider theme={theme}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/tasks/:id" element={<TaskDetail />} />
        </Routes>
      </ThemeProvider>

    </div>
  );
}

export default App;
