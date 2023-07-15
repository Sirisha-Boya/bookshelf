import {
  Autocomplete,
  Avatar,
  Button,
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
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { GetBooks } from "../../services/BooksApi";
import { searchBook } from "../../redux/actions/BookActions";
import SearchIcon from "@mui/icons-material/Search";
import { logoutUser } from "../../redux/actions/UserActions";

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
          <div onClick={() => navigate("/")} style={{ marginRight: 5 }}>
            <Typography variant="h6" sx={{ cursor: "pointer" }}>
              <strong>BookShelf</strong>
            </Typography>
          </div>
          <div onClick={() => navigate("/")}>
            <Typography variant="body1" sx={{ cursor: "pointer", ml: 5 }}>
              Home
            </Typography>
          </div>

          <div onClick={() => navigate("/library")}>
            <Typography variant="body1" sx={{ cursor: "pointer", ml: 5 }}>
              Library
            </Typography>
          </div>
        </Grid>

        <Grid
          item
          xs={6}
          sm={6}
          md={4}
          lg={4}
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Search your book here..."
            size="small"
            onChange={(event) => {
              dispatch(searchBook(event.target.value));
            }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton>
                    <SearchIcon />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          {/* <Autocomplete
            id="free-solo-demo"
            fullWidth
            size="small"
            freeSolo
            options={data?.books?.map(
              (option) => option?.volumeInfo?.title || ""
            )}
            onChange={(e) => {
              console.log("panther", e);
              dispatch(searchBook(e.target.value));
            }}
            // getOptionLabel={(option) => option?.volumeInfo?.title || ""}

            renderInput={(params) => (
              <TextField
                {...params}
                //onChange={(e) => setSearchQuery(e.target.value)}
                label="Search your book here..."
              />
            )}
          /> */}
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
          <Button
            variant="contained"
            size="small"
            color="secondary"
            onClick={() => navigate(`mybookshelf`)}
          >
            My Bookshelf
          </Button>
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
    </>
  );
};

export default AppHeader;
