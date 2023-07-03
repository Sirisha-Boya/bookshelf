import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import "./LandingScreen.css";
import { Register, UserLogin } from "../services/BooksApi";
import { useNavigate } from "react-router-dom";
import LoginScreen from "./LoginScreen";

const LandingScreen = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  // const handleOpen = () => {
  //   e.preventDefault();
  //   setOpen(true);
  // };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <header
      style={{
        backgroundSize: "cover",
        backgroundImage: `url("/images/banner.jpg")`,
        backgroundPosition: "center center",
        height: "713px",
        color: "white",
      }}
    >
      <Grid
        container
        xs={12}
        sm={12}
        md={12}
        lg={12}
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
      >
        <Grid
          item
          xs={12}
          sm={12}
          md={12}
          lg={12}
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
          marginTop={25}
        >
          <Typography variant="h3">Welcome to the Bookshelf</Typography>
          <Typography variant="h4">Unlock Your Imagination</Typography>
          <Button
            variant="contained"
            size="medium"
            id="login"
            onClick={() => {
              setOpen(true);
            }}
          >
            Register/Sign In
          </Button>
        </Grid>
        <LoginScreen Open={open} Close={handleClose} />
      </Grid>
    </header>
  );
};

export default LandingScreen;
