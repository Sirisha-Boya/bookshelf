import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { CssBaseline, Fade } from "@mui/material";
import { ThemeProvider } from "./theme/Theme";
import "./index.css";
import { SnackbarProvider } from "notistack";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <ThemeProvider>
    <React.StrictMode>
      <SnackbarProvider
        maxSnack={2}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        TransitionComponent={Fade}
        transitionDuration={1000}
      >
        <CssBaseline />
        <App />
      </SnackbarProvider>
    </React.StrictMode>
  </ThemeProvider>
);
