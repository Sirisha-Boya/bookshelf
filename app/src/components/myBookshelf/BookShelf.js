import {
  Card,
  CardActionArea,
  CardMedia,
  Grid,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import AppHeader from "../../utilities/AppHeader";
import { BookshelfBooks } from "../../services/BooksApi";
import { useSelector } from "react-redux";

const BookShelf = () => {
  var userDetails = useSelector((x) => x);
  const [bookshelf, setBookshelf] = useState([]);

  const GetBookShelfBooks = async () => {
    var res = await BookshelfBooks(userDetails.userId);
    console.log("bookshelf",res)
    setBookshelf(res)
  };
  useEffect(() => {
    GetBookShelfBooks();
  },[])
  return (
    <>
      <AppHeader />
      <Grid container spacing={2} marginTop={2} marginLeft={5} marginRight={5}>
        <Grid item xs={12} sm={12} md={12} lg={12}>
          <Typography variant="body1" color="secondary">
            Recently added Books...
          </Typography>
        </Grid>
        {bookshelf && bookshelf?.map((book) => (
          <Grid item xs={12} sm={12} md={12} lg={12} display="flex">
          <Card
            // onMouseEnter={() => setIsHovered(true)}
            // onMouseLeave={() => setIsHovered(false)}
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
        ))}
        
      </Grid>
    </>
  );
};

export default BookShelf;
