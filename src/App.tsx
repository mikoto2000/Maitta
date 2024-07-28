import { ThemeProvider } from "@emotion/react";
import "./App.css";
import { Home } from "./pages/Home";
import { createTheme } from "@mui/material";

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
