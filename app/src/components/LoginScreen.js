import { Button, Dialog, Grid, TextField, Typography } from "@mui/material";
import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";

const LoginScreen = (props) => {
  const snackbar = useSnackbar();
  const navigate = useNavigate();

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
      console.log("formik event triggered!", values);
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
          snackbar.enqueueSnackbar("Login Success!", { variant: "success" });
          navigate("/home");
        } else {
          const obj = {
            email: values.email,
            password: values.password,
          };
          var res = await Register(obj);
          if (res.email !== "" && res.password !== "") {
            snackbar.enqueueSnackbar("Registration Success!", {
              variant: "success",
            });
            navigate("/home");
          } else {
            snackbar.enqueueSnackbar("Please Enter all required fields", {
              variant: "error",
            });
          }
          console.log("res", res);
        }
      } catch (error) {
        console.error("Login failed:", error);
        snackbar.enqueueSnackbar("Something went wrong!", { variant: "error" });
      }
    },
  });
  return (
    <Dialog open={props.Open} onClose={props.Close}>
      <form onSubmit={formik.handleSubmit}>
        <Grid container padding={3}>
          <Grid item xs={12} sm={12} md={12} lg={12}>
            <Typography variant="h5">Enter your details</Typography>
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={12}>
            <TextField
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
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={12}>
            <TextField
              // {...formik.getFieldProps("name")}
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
          </Grid>
          <Grid
            item
            xs={12}
            sm={12}
            md={12}
            lg={12}
            display="flex"
            justifyContent="flex-end"
            marginTop={2}
          >
            <Button onClick={props.Close}>Cancel</Button>
            <Button type="submit">Confirm</Button>
          </Grid>
        </Grid>
      </form>
    </Dialog>
  );
};

export default LoginScreen;
