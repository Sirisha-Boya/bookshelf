import {
  Autocomplete,
  Avatar,
  Button,
  Divider,
  Grid,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import { ThemeContext } from "../../theme/Theme";
import { useTheme } from "@mui/material";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { GetBooks } from "../../services/BooksApi";
import { clearSearch, searchBook } from "../../redux/actions/BookActions";
import SearchIcon from "@mui/icons-material/Search";
import { logoutUser } from "../../redux/actions/UserActions";
import Search from "../../utilities/Search";

const AppHeader = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { toggleTheme } = useContext(ThemeContext);
  return (
    <>
      <Grid
        container
        // border="1px solid red"
        marginTop={2}
        marginLeft={5}
        marginRight={5}
      >
        <Grid
          item
          xs={6}
          sm={6}
          md={4}
          lg={4}
          display="flex"
          justifyContent="flex-start"
          alignItems="center"
        >
          <img src="images/books.png" height={30} alt="logo" />
          <div onClick={() => navigate("/home")} style={{ marginRight: 5 }}>
            <Typography variant="h6" sx={{ cursor: "pointer" }}>
              <strong>BookShelf</strong>
            </Typography>
          </div>
          <NavLink
            exact
            to="/home"
            style={({ isActive }) => ({
              color: isActive ? "#ffc107" : "inherit",
              textDecoration: "none",
              marginLeft: 10,
            })}
          >
            Home
          </NavLink>

          <NavLink
            to="/library"
            style={({ isActive }) => ({
              color: isActive ? "#ffc107" : "inherit",
              textDecoration: "none",
              marginLeft: 10,
            })}
          >
            Library
          </NavLink>

          <NavLink
            to="/mybookshelf"
            style={({ isActive }) => ({
              color: isActive ? "#ffc107" : "inherit",
              textDecoration: "none",
              marginLeft: 10,
            })}
          >
            My Bookshelf
          </NavLink>
        </Grid>

        <Grid
          item
          xs={12}
          sm={12}
          md={4}
          lg={4}
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <Search />
        </Grid>

        <Grid
          item
          xs={6}
          sm={6}
          md={3}
          lg={3}
          display="flex"
          justifyContent="flex-end"
          alignItems="center"
        >
          <IconButton onClick={toggleTheme}>
            {theme.palette.mode === "light" ? (
              <Brightness4Icon />
            ) : (
              <Brightness7Icon />
            )}
          </IconButton>
          {/* <Button
            variant="contained"
            size="small"
            color="secondary"
            onClick={() => navigate(`mybookshelf`)}
          >
            My Bookshelf
          </Button> */}
          <Button
            sx={{ ml: 1 }}
            onClick={() => {
              dispatch(logoutUser());
              navigate("/login");
            }}
            variant="contained"
            size="small"
            color="secondary"
          >
            Log Out
          </Button>
        </Grid>
      </Grid>
      <Divider
        variant="middle"
        sx={{ mt: 2.5, borderColor: "secondary.main" }}
      />
    </>
  );
};

export default AppHeader;
