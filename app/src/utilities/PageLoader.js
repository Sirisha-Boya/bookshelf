import { Backdrop, CircularProgress } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";

const PageLoader = () => {
  const data = useSelector((state) => state.books);
  const loader = data.isLoading;
  return (
    <Backdrop
      sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
      open={loader}
    >
      <CircularProgress color="inherit" />
    </Backdrop>
  );
};

export default PageLoader;
