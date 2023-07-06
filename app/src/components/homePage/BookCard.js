import {
  Button,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Grid,
  Paper,
  Typography,
  styled,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { PreviewBookById } from "../../services/BooksApi";

const BookCard = ({ title, fetchBooks }) => {
  const navigate = useNavigate();
  const [books, setBooks] = useState([]);
  const [isHovered, setIsHovered] = useState(false);
  const [preview, setPreview] = useState({});
  const [tempId, setId] = useState("");

  const previewBook = async (id) => {
    console.log("id", id);
    if (id) {
      setId(id);
      var res = await PreviewBookById(id);
      setPreview(res);
      navigate(`/preview/${id}`, {
        state: { id: id },
      });
    } else {
      console.log("Id not received");
    }
  };

  useEffect(() => {
    previewBook();
  }, [tempId]);

  //   const getBooks = async () => {
  //     var res = await GetBooks();
  //     console.log("books", res);
  //     setBooks(res);
  //   };

  //   useEffect(() => {
  //     getBooks();
  //   }, []);

  // useEffect(() => {
  //   async function fetchData() {
  //     const request = await axios.get(fetchUrl);
  //     //console.log("data", request.data);
  //     setBooks(request.data);
  //     return request;
  //   }
  //   fetchData();
  // }, [fetchUrl]);

  // const handleBookChange = (id) => {
  //   console.log("id", id);
  // };
  // var bookInfo = books.map((book) => book.items[0]);
  console.log("bookList", fetchBooks);
  return (
    <Grid container spacing={2} display="flex" direction="row">
      <Grid item xs={12} sm={12} md={12} lg={12} display="flex" marginTop={2}>
        <Typography variant="h4"></Typography>
      </Grid>
      {fetchBooks.map((book) => {
        //let pic = `/images/tempcover.jpg`;
        //console.log("hulk", book);

        return (
          <Grid item xs={12} sm={6} md={3} lg={1} display="flex">
            <Card
              // onMouseEnter={() => setIsHovered(true)}
              // onMouseLeave={() => setIsHovered(false)}
              onClick={() => previewBook(book.id)}
              sx={{
                minWidth: 100,
                maxWidth: 100,
                backgroundColor: "cream",

                ":hover": {
                  boxShadow: 20,
                  transform: "scale(1.09)",
                  opacity: 0.5,
                  transition: "transform 450ms",
                },
              }}
              key={book.id}
            >
              <CardActionArea>
                <CardMedia
                  sx={{ objectFit: "fill", maxWidth: 200 }}
                  component="img"
                  height={150}
                  image={book?.thumbnail}
                  alt="Book Cover"
                />
              </CardActionArea>
            </Card>
          </Grid>
        );
      })}
    </Grid>
  );
};

export default BookCard;

/* let pic =
  book.volumeInfo.imageLinks && book.volumeInfo.imageLinks.thumbnail; */
