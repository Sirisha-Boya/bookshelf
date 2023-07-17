import { IconButton, InputAdornment, TextField } from "@mui/material";
import React from "react";
import SearchIcon from "@mui/icons-material/Search";
import { useDispatch } from "react-redux";
import { clearSearch, searchBook } from "../redux/actions/BookActions";

const Search = () => {
  const dispatch = useDispatch();
  const handleSearch = (event) => {
    const searchTerm = event.target.value;
    if (searchTerm) {
      dispatch(searchBook(searchTerm));
    } else {
      dispatch(clearSearch());
    }
  };
  return (
    <TextField
      fullWidth
      variant="outlined"
      placeholder="Search your book here..."
      size="small"
      onChange={handleSearch}
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
  );
};

export default Search;
