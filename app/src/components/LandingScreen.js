import React, { useState } from "react";
import {
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  Link,
  TextField,
  Typography,
} from "@mui/material";
import "./LandingScreen.css";
import { Register, UserLogin } from "../services/BooksApi";
import { useNavigate } from "react-router-dom";
import LoginScreen from "./LoginScreen";
import NewUserRegistration from "./NewUserRegistration";

const LandingScreen = () => {
  const navigate = useNavigate();
  const [loginOpen, setLoginOpen] = useState(false);
  const [registerOpen, setRegisterOpen] = useState(false);

  // const handleOpen = () => {
  //   e.preventDefault();
  //   setOpen(true);
  // };

  const handleLoginClose = () => {
    setLoginOpen(false);
  };
  const handleRegisterClose = () => {
    setRegisterOpen(false);
  };

  return (
    <Container maxWidth="xl">
      <header
        style={{
          backgroundSize: "cover",
          backgroundImage: `url("/images/banner.jpg")`,
          backgroundPosition: "center center",
          height: "925px",
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
              color="secondary"
              onClick={() => {
                setLoginOpen(true);
              }}
              sx={{ mb: "2px", mt: "2px" }}
            >
              Sign In to explore
            </Button>
            <Link
              component="button"
              id="register"
              variant="body2"
              onClick={() => {
                setRegisterOpen(true);
              }}
              color="secondary"
            >
              New User? Register
            </Link>
          </Grid>
          <LoginScreen Open={loginOpen} Close={handleLoginClose} />
          <NewUserRegistration
            Open={registerOpen}
            Close={handleRegisterClose}
          />
        </Grid>
      </header>
    </Container>
  );
};

export default LandingScreen;
