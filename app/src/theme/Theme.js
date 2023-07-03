import { createTheme } from "@mui/material";
import { amber, grey, yellow } from "@mui/material/colors";

const theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: grey[500],
      //dark: grey[900],
      light: grey[200],
    },
    secondary: {
      main: yellow[500],
      dark: amber[500],
    },
  },
  typography: {
    fontFamily: "Lato",
  },
});
export default theme;
