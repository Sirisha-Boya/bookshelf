import { Container, Grid } from "@mui/material";
import React from "react";

const NotFound = () => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={12} md={12} lg={12} display="flex" justifyContent="center" maxHeight="728px">
        <img
          src="images/NotFound.png"
          alt="Not Found image"
        />
      </Grid>
    </Grid>
  );
};

export default NotFound;
