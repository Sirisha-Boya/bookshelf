import {
  Box,
  Button,
  Container,
  Divider,
  Grid,
  IconButton,
  Paper,
  Rating,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  AddBookToBookshelf,
  AllUserBooks,
  BookshelfBooksStatusCheck,
  PreviewBookById,
} from "../../services/BooksApi";
import AddIcon from "@mui/icons-material/Add";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import CloseIcon from "@mui/icons-material/Close";
import { useSelector } from "react-redux";
import { useSnackbar } from "notistack";

const PreviewBook = (props) => {
  var userDetails = useSelector((x) => x.users);
  var bookDetails = useSelector((state) => state.books);
  const snackbar = useSnackbar();
  console.log("bookDetails in preview book", bookDetails.books);
  const [bookData, setBookData] = useState({});
  const [addBook, setAddBook] = useState([]);
  const [addButton, setAddButton] = useState(false);
  const [bookStatus, setBookStatus] = useState([]);

  const navigate = useNavigate();
  const location = useLocation();
  async function getBookData() {
    var data = await PreviewBookById(location.state.id);
    setBookData(data);
    //console.log("bookData", data);
  }
  async function getBookStatus() {
    var data = await AllUserBooks(userDetails.userId);
    setBookStatus(data);
    console.log("BookStatus", data);
  }
  useEffect(() => {
    getBookStatus();
  }, []);
  useEffect(() => {
    getBookData();
  }, [props.id]);
  var data = bookData?.volumeInfo;

  const [rating, setRating] = useState(0);
  const [initialRating, setInitialRating] = useState(0);
  const [ratingCount, setRatingCount] = useState(0);
  //console.log("data.averageRating:", data?.averageRating);
  //console.log("rating:", rating);
  useEffect(() => {
    if (bookData?.volumeInfo?.averageRating) {
      setRating(bookData.volumeInfo.averageRating);
    }
    if (bookData?.volumeInfo?.ratingsCount) {
      setRatingCount(bookData.volumeInfo.ratingsCount);
    }
  }, [bookData]);
  const handleRatingChange = (event, newValue) => {
    setRating(newValue);
    if (initialRating === 0) {
      setRatingCount((prevCount) => prevCount + 1);
      setInitialRating(newValue);
      // Additional logic here to update the rating in your backend
    }
  };

  const addBookToBookshelf = async () => {
    var res = await AddBookToBookshelf(userDetails.userId, location.state.id);
    if (res.status === 200) {
      snackbar.enqueueSnackbar(res.message, { variant: "success" });
      setAddButton(true);
    } else if (res.status === 404) {
      snackbar.enqueueSnackbar(res.message, { variant: "error" });
      setAddButton(false);
    } else {
      snackbar.enqueueSnackbar(res.message, { variant: "error" });
      setAddButton(false);
    }

    //console.log("res", res);
    setAddBook(res);
  };
  const filterBooks = bookStatus?.filter((book) => book.id);
  //console.log("Rating", data?.averageRating);
  return (
    <Container>
      {bookData && (
        <Grid container spacing={3}>
          <Grid
            item
            xs={12}
            sm={12}
            md={11}
            lg={11}
            marginTop={5}
            display="flex"
            justifyContent="center"
          >
            <Typography variant="h4">{data?.title}</Typography>
          </Grid>
          <Grid
            item
            xs={12}
            sm={1}
            md={1}
            lg={1}
            marginTop={5}
            display="flex"
            justifyContent="flex-end"
          >
            <Button
              size="small"
              onClick={() => navigate(-1)}
              variant="contained"
              color="secondary"
            >
              Back
            </Button>
          </Grid>
          <Grid item xs={12} sm={2.5} md={2} lg={1.5}>
            <img src={data?.imageLinks?.thumbnail} alt="Book Logo" />
            <div style={{ display: "flex", flexDirection: "row" }}>
              <Typography color="secondary" sx={{ ml: 0.5, mr: 0.5 }}>
                Price:
              </Typography>
              {bookData?.saleInfo?.retailPrice ? (
                <Typography>
                  {bookData?.saleInfo?.retailPrice?.amount}{" "}
                  {bookData?.saleInfo?.retailPrice?.currencyCode}
                </Typography>
              ) : (
                "Not available"
              )}
            </div>
          </Grid>
          {/* <Grid item xs={12} sm={2.5} md={2} lg={1.5}>
           
          </Grid> */}
          <Grid item xs={12} sm={9.5} md={10} lg={10.5}>
            <Typography color="secondary" variant="h6">
              Author:
            </Typography>
            {data?.authors?.map((obj) => {
              return <Typography>{obj}</Typography>;
            })}
            <Typography color="secondary"> Publisher: </Typography>
            <Typography>
              <li>{data?.publisher}</li>
            </Typography>
            <Typography color="secondary"> Published Date: </Typography>
            <Typography>
              <li>{data?.publishedDate}</li>
            </Typography>
            <Box display="flex" alignItems="center">
              <Typography color="secondary">Avg. Rating:</Typography>
              <Rating
                sx={{ ml: "5px" }}
                size="small"
                name="half-rating"
                value={rating}
                onChange={handleRatingChange}
                precision={0.5}
              />
              <span>
                {ratingCount} {ratingCount === 1 ? "rating" : "ratings"}
              </span>
            </Box>
            <Box sx={{ mt: "5px" }}>
              <Button
                size="small"
                onClick={addBookToBookshelf}
                startIcon={
                  bookStatus.some((book) => book.id === bookData.id) ? (
                    <ThumbUpAltIcon />
                  ) : (
                    <AddIcon />
                  )
                }
                variant="contained"
                color="secondary"
              >
                {bookStatus.some((book) => book.id === bookData.id)
                  ? "Added"
                  : "My Bookshelf"}
              </Button>

              <Button
                sx={{ ml: 2 }}
                onClick={() =>
                  (window.location.href = bookData?.saleInfo?.buyLink)
                }
                size="small"
                variant="contained"
                color="secondary"
              >
                Buy
              </Button>
            </Box>
          </Grid>

          <Grid item xs={12} sm={12} md={12} lg={12}>
            <Divider variant="middle" sx={{ borderColor: "secondary.main" }} />
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={12}>
            <Typography color="secondary" marginBottom="10px" variant="h5">
              Description:
            </Typography>
            <div dangerouslySetInnerHTML={{ __html: data?.description }} />
          </Grid>
        </Grid>
      )}
    </Container>
  );
};

export default PreviewBook;
