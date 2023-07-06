import {
  Autocomplete,
  Avatar,
  Button,
  Grid,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import React, { useContext } from "react";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import { ThemeContext } from "../theme/Theme";
import { useTheme } from "@mui/material";
import { useNavigate } from "react-router-dom";

const AppHeader = ({ setSearchQuery, searchResults }) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const { toggleTheme } = useContext(ThemeContext);
  var bookTitle = searchResults?.map((book) => book.volumeInfo);
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
          <Typography variant="h6" sx={{ cursor: "pointer" }}>
            <strong>BookShelf</strong>
          </Typography>
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
          {/* <TextField
            fullWidth
            variant="outlined"
            placeholder="Search your book here..."
            size="small"
            value={searchQuery}
            onChange={(e) => {
              handleSearch();
              setSearchQuery(e.target.value);
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
          /> */}
          <Autocomplete
            id="free-solo-demo"
            fullWidth
            size="small"
            freeSolo
            options={bookTitle && bookTitle?.title}
            renderInput={(params) => (
              <TextField
                {...params}
                onChange={(e) => setSearchQuery(e.target.value)}
                label="Search your book here..."
              />
            )}
          />
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
          <Avatar sx={{ ml: 2, backgroundColor: "secondary.dark" }}>S</Avatar>
        </Grid>
      </Grid>
    </>
  );
};

export default AppHeader;
