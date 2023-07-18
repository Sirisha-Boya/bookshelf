import {
  Button,
  Dialog,
  FormControl,
  FormHelperText,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useFormik } from "formik";
import React, { useState } from "react";
import * as Yup from "yup";
import { v4 as uuid } from "uuid";
import { useSnackbar } from "notistack";
import { Register } from "../services/UsersApi";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { registerUser } from "../redux/actions/UserActions";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

const NewUserRegistration = (props) => {
  const snackbar = useSnackbar();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
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
    onSubmit: async (values, { resetForm }) => {
      var payload = {
        username: values.username,
        userid: uuid(),
        email: values.email,
        password: values.password,
      };
      //console.log("payload", payload);
      var res = await Register(payload);
      dispatch(registerUser(payload));
      resetForm();
      //console.log("res", res);
      if (res.status === 200) {
        snackbar.enqueueSnackbar(res.message, {
          variant: "success",
        });
        setTimeout(() => {
          navigate(`/login`);
          snackbar.enqueueSnackbar("Please login to continue", {
            variant: "success",
          });
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
            <FormControl
              variant="outlined"
              fullWidth
              error={formik.errors.password && formik.touched.password}
            >
              <InputLabel htmlFor="outlined-adornment-password">
                Password*
              </InputLabel>
              <OutlinedInput
                {...formik.getFieldProps("password")}
                autoComplete="off"
                size="small"
                id="password"
                name="password"
                label="Password*"
                type={showPassword ? "text" : "password"}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                value={formik.values.password}
                onChange={formik.handleChange}
              />
              <FormHelperText>
                {formik.errors.password &&
                  formik.touched.password &&
                  `${formik.errors.password}`}
              </FormHelperText>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={12}>
            <FormControl
              variant="outlined"
              fullWidth
              error={
                formik.errors.confirmpassword && formik.touched.confirmpassword
              }
            >
              <InputLabel htmlFor="outlined-adornment-password">
                Confirm password*
              </InputLabel>
              <OutlinedInput
                {...formik.getFieldProps("confirmpassword")}
                autoComplete="off"
                size="small"
                id="confirmpassword"
                name="confirmpassword"
                label="Confirm password*"
                type={showPassword ? "text" : "password"}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                value={formik.values.confirmpassword}
                onChange={formik.handleChange}
              />
              <FormHelperText>
                {formik.errors.confirmpassword &&
                  formik.touched.confirmpassword &&
                  `${formik.errors.confirmpassword}`}
              </FormHelperText>
            </FormControl>
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
                onClick={props.Close}
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
