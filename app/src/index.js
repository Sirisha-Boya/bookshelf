import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { Container, CssBaseline, Fade, ThemeProvider } from "@mui/material";
import theme from "./theme/Theme";
import "./index.css";
import { SnackbarProvider } from "notistack";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <ThemeProvider theme={theme}>
    <React.StrictMode>
      <SnackbarProvider
        maxSnack={2}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        TransitionComponent={Fade}
        transitionDuration={2000}
      >
        <CssBaseline />
        <App />
      </SnackbarProvider>
    </React.StrictMode>
  </ThemeProvider>
);
