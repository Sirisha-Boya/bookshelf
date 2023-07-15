import {
  Card,
  CardActionArea,
  CardMedia,
  Divider,
  Grid,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { PreviewBookById } from "../../services/BooksApi";
import { useSelector } from "react-redux";
import Slider from "react-slick";

const BookCard = ({ title, genre }) => {
  console.log("genre", genre);
  const navigate = useNavigate();
  const theme = useTheme();
  const bookData = useSelector((state) => state.books);
  console.log("bookData ", bookData);
  const [preview, setPreview] = useState({});
  const [tempId, setId] = useState("");
  //const [filterBooks, setFilterBooks] = useState(searchData?.books);

  const previewBook = async (id) => {
    //console.log("id", id);
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
  const isScreenSizeDownSm = useMediaQuery(theme.breakpoints.down("sm"));
  const isScreenSizeDownMd = useMediaQuery(theme.breakpoints.down("md"));
  var settings = {
    dots: false,
    infinite: true,
    speed: 1000,
    slidesToShow: isScreenSizeDownSm ? 2 : isScreenSizeDownMd ? 5 : 9,
    slidesToScroll: 4,
    autoplay: true,
    //className: "slider"
  };
  const filteredBooks =
    genre &&
    genre.filter(
      (books) =>
        books.volumeInfo.title.toLowerCase() ===
        bookData?.searchText.toLowerCase()
    );
  // useEffect(() => {}, [bookData?.searchText]);
  return (
    <>
      <div>
        <Typography variant="h6">{title}</Typography>
        <Divider sx={{ borderColor: "secondary.main", mb: 2 }} />
      </div>
      {/* </Grid> */}
      <Slider {...settings}>
        {/* {filteredBooks
          ? filteredBooks?.map((book) => {
              let pic =
                book?.volumeInfo?.imageLinks &&
                book?.volumeInfo?.imageLinks?.thumbnail;
              return (
                <Card
                  // onMouseEnter={() => setIsHovered(true)}
                  // onMouseLeave={() => setIsHovered(false)}
                  onClick={() => previewBook(book.id)}
                  sx={{
                    minWidth: 100,
                    maxWidth: 100,
                    backgroundColor: "cream",
                    mb: 4,

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
              );
            }) */}
        {genre &&
          genre?.map((book) => {
            let pic =
              book?.volumeInfo?.imageLinks &&
              book?.volumeInfo?.imageLinks?.thumbnail;
            return (
              <Card
                // onMouseEnter={() => setIsHovered(true)}
                // onMouseLeave={() => setIsHovered(false)}
                onClick={() => previewBook(book.id)}
                sx={{
                  minWidth: 100,
                  maxWidth: 100,
                  backgroundColor: "cream",
                  mb: 4,

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
            );
          })}
      </Slider>
    </>

    // {/* <Grid item xs={12} sm={12} md={12} lg={12} marginTop={2}>
    //   <Typography variant="h6">Horror</Typography>
    //   {/* <Divider sx={{ borderColor: "secondary.main" }} /> */}
    //  </Grid>
    //   {bookData?.books &&
    //     bookData?.books
    //       ?.filter((books) => books.volumeInfo.genre === "Horror")
    //       .map((book) => {
    //         let pic =
    //           book?.volumeInfo?.imageLinks &&
    //           book?.volumeInfo?.imageLinks?.thumbnail;
    //         return (
    //           <Grid
    //             item
    //             xs={12}
    //             sm={6}
    //             md={3}
    //             lg={1.5}
    //             display="flex"
    //             key={book.id}
    //           >
    //             <Card
    //               // onMouseEnter={() => setIsHovered(true)}
    //               // onMouseLeave={() => setIsHovered(false)}
    //               onClick={() => previewBook(book.id)}
    //               sx={{
    //                 minWidth: 100,
    //                 maxWidth: 100,
    //                 backgroundColor: "cream",

    //                 ":hover": {
    //                   boxShadow: 20,
    //                   transform: "scale(1.09)",
    //                   opacity: 0.5,
    //                   transition: "transform 450ms",
    //                 },
    //               }}
    //             >
    //               <CardActionArea>
    //                 <CardMedia
    //                   sx={{ objectFit: "fill", maxWidth: 200 }}
    //                   component="img"
    //                   height={150}
    //                   image={pic}
    //                   alt="Book Cover"
    //                 />
    //               </CardActionArea>
    //             </Card>
    //           </Grid>
    //         );
    //       })}
    // </Grid> */}
  );
};

export default BookCard;
