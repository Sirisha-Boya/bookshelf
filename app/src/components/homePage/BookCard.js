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
import { GetBooks, PreviewBookById } from "../../services/BooksApi";
import { useSelector } from "react-redux";

const BookCard = ({ fetchBooks }) => {
  const navigate = useNavigate();
  const searchData = useSelector((state) => state.books);
  const [preview, setPreview] = useState({});
  const [tempId, setId] = useState("");
  const [filterBooks, setFilterBooks] = useState([]);

  const previewBook = async (id) => {
    //console.log("id", id);
    if (id) {
      setId(id);
      var res = await PreviewBookById(id);
      setPreview(res);
      navigate(`/home/preview/${id}`, {
        state: { id: id },
      });
    } else {
      console.log("Id not received");
    }
  };

  // const finalData = search(fetchBooks);

  // function search(searchData) {
  //   console.log("Friday", searchData);
  //   var response = searchData && searchData?.map((obj) => {
  //     if (searchData?.searchText === "") {
  //       return obj;
  //     } else {
  //       return obj?.volumeInfo?.title
  //         ?.toUpperCase()
  //         .includes(searchData?.searchText?.toUpperCase());
  //     }
  //   });
  //   return response;
  // }

  // const filteredData = () => {
  //   if (searchData.searchText !== "") {
  //     var res =
  //       searchData?.books &&
  //       searchData?.books.filter((obj) => {
  //         obj?.volumeInfo?.title
  //           ?.toLowerCase()
  //           .includes(searchData?.searchText?.toLowerCase());
  //       });
  //     console.log("search res", res);
  //     setFilterBooks(res);
  //   } else {
  //     setFilterBooks(searchData?.books);
  //     console.log("search res books", searchData?.books);
  //   }
  // };

  // useEffect(() => {
  //   filteredData();
  // }, [searchData.searchText, searchData.books]);
  return (
    <Grid container spacing={2} display="flex" direction="row">
      {/* <Grid item xs={12} sm={12} md={12} lg={12} display="flex" marginTop={2}>
        <Typography variant="h4"></Typography>
      </Grid> */}
      {fetchBooks.length > 0 &&
        fetchBooks?.map((book) => {
          let pic =
            book?.volumeInfo?.imageLinks &&
            book?.volumeInfo?.imageLinks?.thumbnail;
          return (
            <Grid
              item
              xs={12}
              sm={6}
              md={3}
              lg={1}
              display="flex"
              key={book.id}
            >
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
              >
                <CardActionArea>
                  <CardMedia
                    sx={{ objectFit: "fill", maxWidth: 200 }}
                    component="img"
                    height={150}
                    image={pic}
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
