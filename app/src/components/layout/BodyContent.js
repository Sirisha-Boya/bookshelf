import { Box } from "@mui/material";
import React from "react";
import { Outlet } from "react-router-dom";

const BodyContent = () => {
  return (
    <Box marginTop={5} marginLeft={5} marginRight={5}>
      <Outlet />
    </Box>
  );
};

export default BodyContent;
//border="1px solid red"
