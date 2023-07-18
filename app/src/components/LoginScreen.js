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
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";
import { Login, Users } from "../services/UsersApi";
import { useDispatch } from "react-redux";
import {
  fetchLoginFailure,
  fetchLoginRequest,
  fetchLoginSuccess,
} from "../redux/actions/UserActions";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

const LoginScreen = (props) => {
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
      var payload = {
        email: values.email,
        password: values.password,
      };
      try {
        dispatch(fetchLoginRequest());
        const response = await Login(payload);
        // const users = response;
        //console.log("response", response);

        if (response.status === 200) {
          dispatch(fetchLoginSuccess(response.data));
          snackbar.enqueueSnackbar(response.message, { variant: "success" });
          setTimeout(() => {
            navigate("/");
          }, 1000);
        } else if (response.status === 404) {
          snackbar.enqueueSnackbar(response.message, { variant: "error" });
        } else if (response.status === 401) {
          snackbar.enqueueSnackbar(response.message, { variant: "error" });
        } else {
          snackbar.enqueueSnackbar(response.message, { variant: "error" });
        }
      } catch (error) {
        dispatch(fetchLoginFailure(error));
        snackbar.enqueueSnackbar("Something went wrong!", { variant: "error" });
      }
    },
  });
  return (
    <Dialog open={props.Open} onClose={props.Close} maxWidth="xs">
      <form onSubmit={formik.handleSubmit}>
        <Grid container spacing={3} padding={2}>
          <Grid item xs={12} sm={12} md={12} lg={12}>
            <Typography variant="h5">Enter Login details</Typography>
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={12}>
            <TextField
              {...formik.getFieldProps("email")}
              fullWidth
              size="small"
              id="email"
              name="email"
              label="Email Address*"
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
            <FormControl variant="outlined" fullWidth error={formik.errors.password && formik.touched.password}>
              <InputLabel htmlFor="outlined-adornment-password">
                Password*
              </InputLabel>
              <OutlinedInput
                {...formik.getFieldProps("password")}
                autoComplete="off"
                size="small"
                id="password"
                name="password"
                label="Password"
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
              <FormHelperText>{
                  formik.errors.password &&
                  formik.touched.password &&
                  `${formik.errors.password}`
                }</FormHelperText>
            </FormControl>
            {/* <TextField
              {...formik.getFieldProps("password")}
              fullWidth
              size="small"
              autoComplete="off"
              id="password"
              name="password"
              label="Password*"
              value={formik.values.password}
              onChange={formik.handleChange}
              helperText={
                formik.errors.password &&
                formik.touched.password &&
                `${formik.errors.password}`
              }
              error={formik.errors.password && formik.touched.password}
            /> */}
          </Grid>
          <Grid
            item
            xs={12}
            sm={12}
            md={12}
            lg={12}
            display="flex"
            justifyContent="flex-end"
          >
            <Button
              size="small"
              color="secondary"
              variant="outlined"
              onClick={props.Close}
              sx={{ mr: 1 }}
            >
              Cancel
            </Button>
            <Button
              size="small"
              color="secondary"
              variant="contained"
              type="submit"
            >
              Sign In
            </Button>
          </Grid>
        </Grid>
      </form>
    </Dialog>
  );
};

export default LoginScreen;
