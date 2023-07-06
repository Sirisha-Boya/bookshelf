import React, { useEffect, useState } from "react";
import AppHeader from "../../utilities/AppHeader";
import BodyContent from "../../utilities/BodyContent";
import axios from "axios";
import { searchBooks } from "../../services/Requests";

const HomePage = ({ toggleTheme, isDarkMode }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  // const getSearchBooks = async () => {
  //   var res = await searchBooks();
  //   console.log("search", res);
  //   setSearchResults(res);
  // };

  // useEffect(() => {
  //   if (searchQuery.length > 2) {
  //     getSearchBooks();
  //   }
  // }, [searchQuery]);
  //console.log("search Query:", searchQuery);
  return (
    <>
      <AppHeader
        toggleTheme={toggleTheme}
        isDarkMode={isDarkMode}
        setSearchQuery={setSearchQuery}
        // searchResults={searchResults}
      />
      <BodyContent />

      {/* searchResults={searchResults} /> */}
    </>
  );
};

export default HomePage;
