import React, { useEffect, useState } from "react";
import AppHeader from "../../utilities/AppHeader";
import BodyContent from "../../utilities/BodyContent";
import axios from "axios";
import { searchBooks } from "../../services/Requests";
import { GetBooks } from "../../services/BooksApi";

const HomePage = ({ toggleTheme, isDarkMode }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [bookList, setBookList] = useState([]);

  const getBookList = async () => {
    var res = await GetBooks();
    console.log("search", res);
    setBookList(res);
  };

  useEffect(() => {
    getBookList();
  }, []);
  return (
    <>
      <AppHeader
        toggleTheme={toggleTheme}
        isDarkMode={isDarkMode}
        setSearchQuery={setSearchQuery}
        // searchResults={searchResults}
      />
      <BodyContent bookList={bookList} />

      {/* searchResults={searchResults} /> */}
    </>
  );
};

export default HomePage;
