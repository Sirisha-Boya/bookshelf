import React, { useEffect, useState } from "react";
import BookCard from "./BookCard";
import { GetBooks } from "../../services/BooksApi";
import { useSelector } from "react-redux";

const HomePage = () => {
  var data = useSelector((state) => state.books);
  //console.log("redux book data", data.books);
  const getBookList = async() => {
    await GetBooks();
  }

  useEffect(() => {
    getBookList();
  }, []);
  return <BookCard fetchBooks={data.books} />;
};

export default HomePage;
