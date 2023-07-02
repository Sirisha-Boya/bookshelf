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
import { useSnackbar } from "material-ui-snackbar-provider";
import { useFormik } from "formik";
import * as Yup from "yup";


const LandingScreen = () => {
  const navigate = useNavigate();
  const snackbar = useSnackbar();
  const [open, setOpen] = useState(false);

  const handleOpen = (e) => {
    e.preventDefault();
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Not a valid email!")
        .required("Email is required!"),
      password: Yup.string().required("Password is required!"),
    }),
    onSubmit: async (values) => {
      try {
        const response = await UserLogin();
        const users = response;

        // Find the user with matching credentials
        const user = users.find(
          (user) =>
            user.email === values.email && user.password === values.password
        );

        if (user) {
          // Handle successful login
          console.log("Login successful:", user);
          snackbar.showMessage("Login Success!");
          navigate("/home");
        } else {
          const obj = {
            email: values.email,
            password: values.password,
          };
          var res = await Register(obj);
          if (res.email !== "" && res.password !== "") {
            snackbar.showMessage("Registered Successfully!");
            navigate("/home");
          } else {
            snackbar.showMessage("Please enter all required fields!");
          }
          console.log("res", res);
        }
      } catch (error) {
        console.error("Login failed:", error);
        snackbar.showMessage("!");
      }
    },
  });

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
            onClick={handleOpen}
          >
            Register/Sign In
          </Button>
          <form onSubmit={formik.handleSubmit}>
            <Dialog open={open} onClose={handleClose}>
              <DialogTitle>Enter your details</DialogTitle>
              <DialogContent>
                {/* <DialogContentText>
            To subscribe to this website, please enter your email address here.
            We will send updates occasionally.
          </DialogContentText> */}
                <TextField
                  {...formik.getFieldProps("email")}
                  id="email"
                  name="email"
                  label="Email Address*"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  fullWidth
                  variant="standard"
                  helperText={
                    formik.errors.email &&
                    formik.touched.email &&
                    `${formik.errors.email}`
                  }
                  error={formik.errors.email && formik.touched.email}
                />
                <TextField
                  {...formik.getFieldProps("name")}
                  id="password"
                  name="password"
                  label="Password*"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  fullWidth
                  variant="standard"
                  helperText={
                    formik.errors.password &&
                    formik.touched.password &&
                    `${formik.errors.password}`
                  }
                  error={formik.errors.password && formik.touched.password}
                />
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button type="submit">Confirm</Button>
              </DialogActions>
            </Dialog>
          </form>
        </Grid>
      </Grid>
    </header>
  );
};

export default LandingScreen;
