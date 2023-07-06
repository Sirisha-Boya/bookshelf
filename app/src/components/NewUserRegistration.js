import {
  Button,
  Dialog,
  Grid,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useFormik } from "formik";
import React from "react";
import * as Yup from "yup";
import { v4 as uuid } from "uuid";
import { useSnackbar } from "notistack";
import { Register } from "../services/UsersApi";
import { useNavigate } from "react-router-dom";

const NewUserRegistration = (props) => {
  const snackbar = useSnackbar();
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
      confirmpassword: "",
      userid: "",
    },
    validationSchema: Yup.object({
      username: Yup.string().required("Please enter your fullname!"),
      email: Yup.string()
        .email("Enter a valid email!")
        .required("Please enter your email!"),
      password: Yup.string().required("Please enter password!"),
      confirmpassword: Yup.string()
        .required("Please confirm your password!")
        .oneOf([Yup.ref("password")], "Passwords Should match!"),
    }),
    onSubmit: async (values) => {
      var payload = {
        username: values.username,
        userid: uuid(),
        email: values.email,
        password: values.password,
      };
      //console.log("payload", payload);
      var res = await Register(payload);
      //console.log("res", res);
      if (res.status === 200) {
        snackbar.enqueueSnackbar(res.message, {
          variant: "success",
        });
        setTimeout(() => {
          navigate(`/home`);
        }, 1000);
      } else if (res.status === 400) {
        snackbar.enqueueSnackbar("Email already exists!", {
          variant: "error",
        });
        snackbar.enqueueSnackbar("Please login!", {
          variant: "info",
        });
      } else if (res.error === 500) {
        snackbar.enqueueSnackbar("Something went wrong!", {
          variant: "error",
        });
        snackbar.enqueueSnackbar("Please try again", {
          variant: "info",
        });
      } else {
        snackbar.enqueueSnackbar(res.error, {
          variant: "error",
        });
      }
    },
  });
  return (
    <Dialog open={props.Open} onClose={props.Close} maxWidth="xs">
      <form onSubmit={formik.handleSubmit}>
        <Grid container spacing={3} padding={3}>
          <Grid
            item
            xs={12}
            sm={12}
            md={12}
            lg={12}
            display="flex"
            justifyContent="center"
            alignContent="center"
          >
            <Typography variant="h5">Registration details</Typography>
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={12}>
            <TextField
              {...formik.getFieldProps("username")}
              fullWidth
              autoComplete="off"
              id="username"
              name="username"
              label="Full Name*"
              size="small"
              value={formik.values.username}
              onChange={formik.handleChange}
              helperText={
                formik.errors.username &&
                formik.touched.username &&
                `${formik.errors.username}`
              }
              error={formik.errors.username && formik.touched.username}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={12}>
            <TextField
              {...formik.getFieldProps("email")}
              fullWidth
              autoComplete="off"
              id="email"
              name="email"
              label="Email Address*"
              size="small"
              value={formik.values.email}
              onChange={formik.handleChange}
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
              {...formik.getFieldProps("password")}
              fullWidth
              autoComplete="off"
              id="password"
              name="password"
              label="Password*"
              size="small"
              value={formik.values.password}
              onChange={formik.handleChange}
              helperText={
                formik.errors.password &&
                formik.touched.password &&
                `${formik.errors.password}`
              }
              error={formik.errors.password && formik.touched.password}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={12}>
            <TextField
              {...formik.getFieldProps("confirmpassword")}
              fullWidth
              autoComplete="off"
              id="confirmpassword"
              name="confirmpassword"
              label="Confirm Password*"
              size="small"
              value={formik.values.confirmpassword}
              onChange={formik.handleChange}
              helperText={
                formik.errors.confirmpassword &&
                formik.touched.confirmpassword &&
                `${formik.errors.confirmpassword}`
              }
              error={
                formik.errors.confirmpassword && formik.touched.confirmpassword
              }
            />
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={12}>
            <Stack direction="row" justifyContent="flex-end">
              <Button
                variant="outlined"
                color="secondary"
                size="small"
                sx={{ mr: "5px" }}
                onClick={props.Close}
              >
                Cancel
              </Button>
              <Button
                variant="contained"
                color="secondary"
                size="small"
                type="submit"
              >
                Submit
              </Button>
            </Stack>
          </Grid>
        </Grid>
      </form>
    </Dialog>
  );
};

export default NewUserRegistration;
