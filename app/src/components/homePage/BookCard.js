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

const BookCard = ({ title, fetchUrl, searchResults }) => {
  const navigate = useNavigate();
  const [books, setBooks] = useState([]);
  const [isHovered, setIsHovered] = useState(false);

  //   const getBooks = async () => {
  //     var res = await GetBooks();
  //     console.log("books", res);
  //     setBooks(res);
  //   };

  //   useEffect(() => {
  //     getBooks();
  //   }, []);

  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(fetchUrl);
      console.log("data", request.data);
      setBooks(request.data);
      return request;
    }
    fetchData();
  }, [fetchUrl]);

  const handleBookChange = (id) => {
    console.log("id", id);
  };
  //console.log(books);
  return (
    <Grid container spacing={2} display="flex" direction="row">
      <Grid item xs={12} sm={12} md={12} lg={12} display="flex" marginTop={2}>
        <Typography variant="h4">{title}</Typography>
      </Grid>
      {books.map((book) => {
        {
          /* let pic =
          book.volumeInfo.imageLinks && book.volumeInfo.imageLinks.thumbnail; */
        }
        let pic = `/images/tempcover.jpg`;
        if (pic != undefined) {
          return (
            <Grid item xs={12} sm={6} md={3} lg={1} display="flex">
              <Card
                // onMouseEnter={() => setIsHovered(true)}
                // onMouseLeave={() => setIsHovered(false)}
                onClick={(e) => {
                  e.preventDefault();
                  navigate(`preview/${book.id}`, {
                    state: { id: book.id },
                  });
                }}
                sx={{
                  minWidth: 100,
                  maxWidth: 100,
                  backgroundColor: "cream",

                  ":hover": {
                    boxShadow: 20,
                    transform: "scale(1.09)",
                    opacity: 0.3,
                    transition: "transform 450ms",
                  },
                }}
                key={book.id}
              >
                <CardActionArea onClick={() => handleBookChange(book.id)}>
                  <CardMedia
                    sx={{ objectFit: "fill", maxWidth: 200 }}
                    component="img"
                    height={150}
                    image={pic}
                    alt={pic}
                  />
                </CardActionArea>
              </Card>
            </Grid>
          );
        }
      })}
    </Grid>
  );
};

export default BookCard;
