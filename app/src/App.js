import { RouterProvider } from "react-router-dom";
import { CssBaseline, Fade, Slide } from "@mui/material";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { SnackbarProvider } from "notistack";
import RoutesIndex from "./components/routes/RoutesIndex";
import store from "./redux/store";
import { persistStore } from "redux-persist";
import { ThemeProvider } from "./theme/Theme";
import PageLoader from "./utilities/PageLoader";

function App() {
  return (
    <>
      <ThemeProvider>
        <SnackbarProvider
          maxSnack={2}
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
          TransitionComponent={Slide}
          transitionDuration={1000}
        >
          <CssBaseline />
          <PageLoader />
          <RouterProvider router={RoutesIndex} />
        </SnackbarProvider>
      </ThemeProvider>
    </>
  );
}

export default App;
