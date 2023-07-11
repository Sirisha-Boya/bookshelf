import { Container, Grid } from "@mui/material";
import React from "react";
import "../index.css";

const NotFound = () => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={12} md={12} lg={12}>
        <img
          className="notfound"
          src="images/NotFound.png"
          alt="Not Found image"
        />
      </Grid>
    </Grid>
  );
};

export default NotFound;
