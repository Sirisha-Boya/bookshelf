import { ThemeProvider, createTheme } from "@mui/material";
import { amber, grey } from "@mui/material/colors";
import { createContext, useEffect, useState } from "react";

const ThemeContext = createContext();

const ThemeProviderWrapper = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      setIsDarkMode(savedTheme === "dark");
    } else {
      setIsDarkMode(false); // Set the default theme mode here
    }
  }, []);

  const toggleTheme = () => {
    setIsDarkMode((prevMode) => !prevMode);
  };

  useEffect(() => {
    localStorage.setItem("theme", isDarkMode ? "dark" : "light");
  }, [isDarkMode]);

  const theme = createTheme({
    //color code for amber #ffc107
    palette: {
      primary: {
        main: grey[500],
        light: grey[200],
      },
      secondary: {
        main: amber[500],
        dark: amber[400],
      },
      mode: isDarkMode ? "dark" : "light",
    },
    typography: {
      fontFamily: "Lato",
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            textTransform: "none",
          },
        },
      },
    },
  });

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </ThemeContext.Provider>
  );
};

export { ThemeContext, ThemeProviderWrapper as ThemeProvider };
