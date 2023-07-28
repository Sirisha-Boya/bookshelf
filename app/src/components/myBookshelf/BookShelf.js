import {
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import AppHeader from "../layout/AppHeader";
import { BookshelfBooksStatusCheck, UpdateBook } from "../../services/BooksApi";
import { useSelector } from "react-redux";
import { useSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";
import PageLoader from "../../utilities/PageLoader";
import NoData from "../../utilities/NoData";

const BookShelf = () => {
  var userDetails = useSelector((x) => x.users);
  var bookDetails = useSelector((state) => state.books);
  const navigate = useNavigate();
  const snackbar = useSnackbar();
  const [bookshelf, setBookshelf] = useState([]);

  const GetBookShelfBooks = async () => {
    var status = 0; //Want to Read status
    await BookshelfBooksStatusCheck(userDetails.userId, status);
    //console.log("res",res)
    // setBookshelf(res);
  };
  //console.log("bookHulk", bookDetails);
  useEffect(() => {
    GetBookShelfBooks();
  }, []);

  const handleReadNow = async (bookid) => {
    var obj = {
      bookprogress: 0,
      status: 1,
      //status: 1 ===> Currently Reading
    };
    var res = await UpdateBook(userDetails.userId, bookid, obj);
    if (res.status === 200) {
      snackbar.enqueueSnackbar(res.message, { variant: "success" });
      navigate("/home");
    } else if (res.status === 404) {
      snackbar.enqueueSnackbar(res.message, { variant: "error" });
    } else {
      snackbar.enqueueSnackbar(res.message, { variant: "error" });
    }
  };
  const filteredBooks = bookDetails?.bookshelfBooks?.books?.filter((book) =>
  book?.volumeInfo?.title
    .toLowerCase()
    .includes(bookDetails?.searchText?.toLowerCase())
);
  //console.log("book",bookDetails)
  return (
    <>
      {/* <AppHeader /> */}
      <Grid container spacing={2} display="flex" direction="row">
        <Grid item xs={12} sm={12} md={12} lg={12}>
          <Typography variant="body1" color="secondary">
            <strong>Recently added Books...</strong>
          </Typography>
        </Grid>
        {/* {bookDetails?.isLoading && <PageLoader />} */}
        {filteredBooks &&
          filteredBooks.map((book) => (
            <Grid item xs={8} sm={5} md={3} lg={2}>
              <CardMedia
              
                sx={{
                  objectFit: "fill",
                  mb: 1,
                  borderRadius: "20px",
                  border: "1px solid #ffc107",
                }}
                component="img"
                //sx={{ mb: 1 }}
                height={300}
                image={book?.volumeInfo?.imageLinks?.thumbnail}
                alt="Book Cover"
              />

              <Button
             
                fullWidth
                size="small"
                variant="contained"
                color="secondary"
                sx={{ borderRadius: "20px", mb: 1 }}
                onClick={() => handleReadNow(book.id)}
              >
                Read Now
              </Button>
            </Grid>
          ))}
        {bookDetails?.error && (
          <Grid
            item
            xs={12}
            sm={12}
            md={12}
            lg={12}
            display="flex"
            alignItems="center"
          >
            <NoData />
            <Typography variant="h5">No Books Found!</Typography>
          </Grid>
        )}
      </Grid>
    </>
  );
};

export default BookShelf;
