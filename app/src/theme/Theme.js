import { createTheme } from "@mui/material";
import { grey } from "@mui/material/colors";

const theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: grey[500],
      //dark: grey[900],
      light: grey[200],
    },
  },
  typography: {
    fontFamily: "Lato",
  },
});
export default theme;
