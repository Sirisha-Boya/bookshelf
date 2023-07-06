import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { CssBaseline, Fade } from "@mui/material";
import { ThemeProvider } from "./theme/Theme";
import "./index.css";
import { SnackbarProvider } from "notistack";
import { Provider } from "react-redux";
import store from "./redux/store";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";

let persistor = persistStore(store);
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <ThemeProvider>
    <Provider store={store}>
      <PersistGate persistor={persistor}>
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
      </PersistGate>
    </Provider>
  </ThemeProvider>
);
