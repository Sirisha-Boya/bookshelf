import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { Container, CssBaseline, ThemeProvider } from "@mui/material";
import theme from "./theme/Theme";
import "./index.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <ThemeProvider theme={theme}>
    <React.StrictMode>
      <CssBaseline />
      <App />
    </React.StrictMode>
  </ThemeProvider>
);
