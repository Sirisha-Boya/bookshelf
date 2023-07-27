import React, { useEffect } from "react";
import BookCard from "./BookCard";
import { useSelector } from "react-redux";
import { GetBooks } from "../../services/BooksApi";

const Library = () => {
  var bookData = useSelector((state) => state.books);

  useEffect(() => {
    const fetchLibrary = async () => {
      await GetBooks();
    };
    fetchLibrary();
  }, []);
 
  const filteredBooks = bookData?.books?.filter((book) =>
    book?.volumeInfo?.title
      .toLowerCase()
      .includes(bookData?.searchText?.toLowerCase())
  );
  // Filter books based on genres
  //console.log("filter", filteredBooks);
  const getBooksByGenre = (genre) => {
    return filteredBooks?.filter((book) => book?.volumeInfo?.genre === genre);
  };

  return (
    <>
      <BookCard
        title="Technologies"
        //genre="Technologies"
        filteredBooks={getBooksByGenre("Technologies")}
      />
      <BookCard
        title="Horror"
        //genre={getBooksByGenre("Horror")}
        filteredBooks={getBooksByGenre("Horror")}
      />
      <BookCard
        title="Comics"
        //genre={getBooksByGenre("Comics")}
        filteredBooks={getBooksByGenre("Comics")}
      />
      <BookCard
        title="Novels"
        //genre={getBooksByGenre("Novels")}
        filteredBooks={getBooksByGenre("Novels")}
      />
      <BookCard
        title="Poetry"
        //genre={getBooksByGenre("Other")}
        filteredBooks={getBooksByGenre("Poetry")}
      />
      <BookCard
        title="Others"
        //genre={getBooksByGenre("Poetry")}
        filteredBooks={getBooksByGenre("Others")}
      />
    </>
  );
};

export default Library;
