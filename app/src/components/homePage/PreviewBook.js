import {
  Box,
  Button,
  Container,
  Divider,
  Grid,
  IconButton,
  Paper,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { PreviewBookById } from "../../services/BooksApi";
import AddIcon from "@mui/icons-material/Add";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import CloseIcon from "@mui/icons-material/Close";

const PreviewBook = (props) => {
  const [bookData, setBookData] = useState({});
  const [addBook, setAddBook] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  async function getBookData() {
    var data = await PreviewBookById(location.state.id);
    setBookData(data);
    console.log("bookData", data);
  }
  useEffect(() => {
    getBookData();
  }, [props.id]);
  var data = bookData?.volumeInfo;
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
            justifyContent="center "
          >
            <IconButton onClick={() => navigate(-1)}>
              <CloseIcon />
            </IconButton>
          </Grid>
          <Grid item xs={12} sm={2.5} md={2} lg={1.5}>
            <img src={data?.imageLinks?.thumbnail} alt="Book Logo" />
          </Grid>
          <Grid item xs={12} sm={9.5} md={10} lg={10.5}>
            {data?.authors?.map((obj) => {
              return <Typography variant="h6">Author: {obj}</Typography>;
            })}
            <Typography color="secondary.dark"> Publisher: </Typography>
            <Typography>
              <li>{data?.publisher}</li>
            </Typography>
            <Typography color="secondary.dark"> Published Date: </Typography>
            <Typography>
              <li>{data?.publishedDate}</li>
            </Typography>

            <Typography>Avg. Rating: {data?.averageRating}</Typography>

            <Box sx={{ mt: "5px" }}>
              <Button
                size="small"
                onClick={() => setAddBook(!addBook)}
                startIcon={addBook ? <ThumbUpAltIcon /> : <AddIcon />}
                variant="contained"
                color="secondary"
              >
                {addBook === true ? "Added" : "My BookShelf"}
              </Button>
              {/* <Button
                sx={{ ml: "5px" }}
                size="small"
                variant="contained"
                color="secondary"
                startIcon={<VisibilityIcon />}
              >
                Preview
              </Button> */}
            </Box>
          </Grid>

          <Grid item xs={12} sm={12} md={12} lg={12}>
            <Divider variant="middle" sx={{ borderColor: "secondary.dark" }} />
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={12}>
            <Typography color="secondary.dark" marginBottom="10px" variant="h5">
              Description:
            </Typography>
            <Typography>{data?.description}</Typography>
          </Grid>
        </Grid>
      )}
    </Container>
  );
};

export default PreviewBook;
