import { Box } from "@mui/material";
import React from "react";
import BookCard from "../components/homePage/BookCard";
import { requests } from "../services/Requests";

const BodyContent = (props) => {
  //console.log("body", searchResults);
  return (
    <Box marginTop={5} marginLeft={5} marginRight={5}>
      <BookCard
        title="Novels"
        fetchBooks={props.bookList}
      />
      {/* <BookCard
        title="IT"
        fetchUrl={requests.it}
        searchResults={searchResults}
      />
      <BookCard
        title="Poetry"
        fetchUrl={requests.poetry}
        searchResults={searchResults}
      />
      <BookCard
        title="Humor"
        fetchUrl={requests.humor}
        searchResults={searchResults}
      />
      <BookCard
        title="Technology"
        fetchUrl={requests.technology}
        searchResults={searchResults}
      /> */}
    </Box>
  );
};

export default BodyContent;
//border="1px solid red"
