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
  const [id, setId] = useState("");

  const bookshelfBooks = async () => {
    var status = 1; // Currently Reading status
    await BookshelfBooksStatusCheck(userData.userId, status);
  };

  const handleProgressChange = async (event, bookid) => {
    var buttonId = event.currentTarget.id;
    //console.log("buttonId", event);
    var obj;
    if (buttonId === "finished") {
      obj = {
        bookprogress: parseFloat(100),
        status: 2, //Finished reading
      };
    } else if (buttonId === "update" && parseFloat(percentage) === 100) {
      obj = {
        bookprogress: parseFloat(100),
        status: 2, //Finished reading
      };
    } else {
      obj = {
        bookprogress: parseFloat(percentage),
        status: 1, //Currently Reading
      };
    }
    setOpen(false);
    var res = await UpdateBook(userData.userId, bookid, obj);
    dispatch(updateBookProgress(bookid));
    console.log("green", res);
    if (res.status === 200) {
      snackbar.enqueueSnackbar(res.message, { variant: "success" });
    } else if (res.status === 404) {
      snackbar.enqueueSnackbar(res.message, { variant: "error" });
    } else {
      snackbar.enqueueSnackbar(res.message, { variant: "error" });
    }
  };

  const bookDetails = bookData?.bookshelfBooks?.books?.filter(
    (obj) => obj.id === bookData?.selectedBookId
  )[0];

  //console.log("bbb", bookDetails);
  useEffect(() => {
    bookshelfBooks();
  }, []);

  const filteredBooks = bookData?.bookshelfBooks?.books?.filter((book) =>
    book?.volumeInfo?.title
      .toLowerCase()
      .includes(bookData?.searchText?.toLowerCase())
  );
  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={12} md={12} lg={12}>
          <Typography variant="h6" color="secondary">
            <strong>Currently Reading ...</strong>
          </Typography>
        </Grid>
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
                sx={{ borderRadius: "20px", mb: 1 }}
                size="small"
                variant="outlined"
                color="secondary"
                onClick={() => {
                  dispatch(updateBookProgress(book.id)); //to get book id in selectedBookId redux state
                  setId(book.id);
                  setOpen(true);
                }}
                startIcon={<BookProgress bookId={book.id} />}
              >
                Update Progress
              </Button>
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
                  type="number"
                  value={percentage}
                  onChange={(e) => setPercentage(e.target.value)}
                />
              </Box>
              <Box sx={{ mt: 5 }} justifyContent="center">
                <Button
                  size="small"
                  variant="contained"
                  color="secondary"
                  id="update"
                  onClick={(e) => handleProgressChange(e, id)}
                >
                  Update Progress
                </Button>
                <Button
                  sx={{ ml: "5px" }}
                  size="small"
                  variant="outlined"
                  color="secondary"
                  id="finished"
                  onClick={(e) => handleProgressChange(e, id)}
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
