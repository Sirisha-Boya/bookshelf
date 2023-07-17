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
  // const HorrorGenre = bookData?.books?.filter(
  //   (horror) => horror?.volumeInfo?.genre === "Horror"
  // );
  // const TechnologyGenre = bookData?.books?.filter(
  //   (tech) => tech?.volumeInfo?.genre === "Technologies"
  // );
  // const ComicsGenre = bookData?.books?.filter(
  //   (comic) => comic?.volumeInfo?.genre === "Comics"
  // );
  // const NovelsGenre = bookData?.books?.filter(
  //   (novel) => novel?.volumeInfo?.genre === "Novels"
  // );
  // const OthersGenre = bookData?.books?.filter(
  //   (other) => other?.volumeInfo?.genre === "Other"
  // );
  // const PoetryGenre = bookData?.books?.filter(
  //   (poetry) => poetry?.volumeInfo?.genre === "Poetry"
  // );
  const filteredBooks = bookData?.books?.filter((book) =>
    book?.volumeInfo?.title
      .toLowerCase()
      .includes(bookData?.searchText?.toLowerCase())
  );
  // useEffect(() => {}, [bookData?.searchText]);
  // Filter books based on genres
  console.log("filter", filteredBooks);
  const getBooksByGenre = (genre) => {
    return filteredBooks?.filter((book) => book?.volumeInfo?.genre === genre);
  };
  //console.log("genre", getBooksByGenre("Technologies"));

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
        filteredBooks={getBooksByGenre("Other")}
      />
    </>
  );
};

export default Library;
