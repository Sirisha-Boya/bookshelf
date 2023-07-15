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
  console.log("black panther", bookData.books.books);
  const HorrorGenre = bookData?.books?.books?.filter(
    (horror) => horror?.volumeInfo?.genre === "Horror"
  );
  const TechnologyGenre = bookData?.books?.books?.filter(
    (tech) => tech?.volumeInfo?.genre === "Technologies"
  );
  const ComicsGenre = bookData?.books?.books?.filter(
    (comic) => comic?.volumeInfo?.genre === "Comics"
  );
  const NovelsGenre = bookData?.books?.books?.filter(
    (novel) => novel?.volumeInfo?.genre === "Novels"
  );
  const OthersGenre = bookData?.books?.books?.filter(
    (other) => other?.volumeInfo?.genre === "Other"
  );
  const PoetryGenre = bookData?.books?.books?.filter(
    (poetry) => poetry?.volumeInfo?.genre === "Poetry"
  );
  return (
    <>
      <BookCard title="Technologies" genre={TechnologyGenre} />
      <BookCard title="Horror" genre={HorrorGenre} />
      <BookCard title="Comics" genre={ComicsGenre} />
      <BookCard title="Novels" genre={NovelsGenre} />
      <BookCard title="Others" genre={OthersGenre} />
      <BookCard title="Poetry" genre={PoetryGenre} />
    </>
  );
};

export default Library;
