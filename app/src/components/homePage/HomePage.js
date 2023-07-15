import React, { useEffect, useState } from "react";
import BookCard from "../library/BookCard";
import {
  BookshelfBooks,
  BookshelfBooksStatusCheck,
  UpdateBook,
} from "../../services/BooksApi";
import { useDispatch, useSelector } from "react-redux";
import {
  Box,
  Button,
  CardMedia,
  Dialog,
  DialogTitle,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import PageLoader from "../../utilities/PageLoader";
import BookProgress from "../../utilities/BookProgress";
import {
  updateBookProgress,
  updateBookReset,
} from "../../redux/actions/BookActions";
import { useSnackbar } from "notistack";
import NoData from "../../utilities/NoData";

const HomePage = () => {
  const dispatch = useDispatch();
  const snackbar = useSnackbar();
  var userData = useSelector((state) => state.users);
  var bookData = useSelector((state) => state.books);
  const [open, setOpen] = useState(false);
  const [percentage, setPercentage] = useState(0);
  //const [currentlyReading, setCurrentlyReading] = useState([]);

  const bookshelfBooks = async () => {
    var status = 1; // Currently Reading status
    await BookshelfBooksStatusCheck(userData.userId, status);
    // setCurrentlyReading(res);
  };

  const handleProgressChange = async (bookid) => {
    var obj;
    if (parseFloat(percentage) === 100) {
      obj = {
        bookProgress: parseFloat(percentage),
        status: 2, //Finished reading
      };
    } else {
      obj = {
        bookProgress: parseFloat(percentage),
        status: 1, //currently reading
      };
    }
    setOpen(false);
    var res = await UpdateBook(userData.userId, bookid, obj);
    console.log("green", res);
    if (res.status === 200) {
      snackbar.enqueueSnackbar(res.message, { variant: "success" });
    } else if (res.status === 404) {
      snackbar.enqueueSnackbar(res.message, { variant: "error" });
    } else {
      snackbar.enqueueSnackbar(res.message, { variant: "error" });
    }
  };

  const bookDetails = bookData?.bookshelfBooks?.filter(
    (obj) => obj.id === bookData?.selectedBookId
  )[0];

  //console.log("Stark", bookDetails);
  // const handleProgressChange = async (bookid) => {
  //   var obj = {

  //   }
  //   var res = await UpdateBook(userData.userId, bookid);
  //   console.log("green", res);
  // };

  useEffect(() => {
    bookshelfBooks();
  }, []);
  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={2} sm={2} md={2} lg={2}>
          <Typography variant="h6" color="secondary">
            <strong>Currently Reading ...</strong>
          </Typography>
        </Grid>
        {bookData?.bookshelfBooks &&
          bookData?.bookshelfBooks?.map((book) => (
            <Grid item xs={2} sm={2} md={2} lg={2}>
              <CardMedia
                sx={{ objectFit: "fill", maxWidth: 150, mb: 1 }}
                component="img"
                //sx={{ mb: 1 }}
                //height={250}
                image={book?.volumeInfo?.imageLinks?.thumbnail}
                alt="Book Cover"
              />

              <Button
                //sx={{ maxWidth: 150 }}
                size="small"
                variant="outlined"
                color="secondary"
                onClick={() => {
                  dispatch(updateBookProgress(book.id));
                  setOpen(true);
                }}
              >
                Update Progress
              </Button>
              <BookProgress />
            </Grid>
          ))}

        <Dialog
          fullWidth
          maxWidth="sm"
          onClose={() => {
            dispatch(updateBookReset());
            setOpen(false);
          }}
          open={open}
        >
          <Grid container spacing={2} padding={2}>
            <Grid item xs={12} sm={12} md={3} lg={3} display="flex">
              <img
                src={bookDetails?.volumeInfo?.imageLinks?.thumbnail}
                alt="Book Cover"
                height={200}
              />
            </Grid>
            <Grid
              item
              xs={12}
              sm={12}
              md={8}
              lg={8}
              // display="flex"
              // flexDirection="column"
              marginLeft="30px"
            >
              <Typography variant="h6">
                <strong>{bookDetails?.volumeInfo?.title}</strong>
              </Typography>
              <Box
                marginTop="30px"
                maxWidth={200}
                display="flex"
                flexDirection="column"
              >
                <TextField
                  size="small"
                  id="percentage"
                  name="percentage"
                  label="Completed (%) of 100%"
                  value={percentage}
                  onChange={(e) => setPercentage(e.target.value)}
                />
              </Box>
              <Box sx={{ mt: 5 }} justifyContent="center">
                <Button
                  size="small"
                  variant="contained"
                  color="secondary"
                  onClick={() => handleProgressChange(bookData?.selectedBookId)}
                >
                  Update Progress
                </Button>
                <Button
                  sx={{ ml: "5px" }}
                  size="small"
                  variant="outlined"
                  color="secondary"
                >
                  I've Finished
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Dialog>
        {bookData?.error && (
          <Grid
            item
            xs={12}
            sm={12}
            md={12}
            lg={12}
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <NoData />
            <Typography variant="h5">Uh oh! No Books added to read!</Typography>
          </Grid>
        )}
      </Grid>
    </>
  );
};

export default HomePage;
