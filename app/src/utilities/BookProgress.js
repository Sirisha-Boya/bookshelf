import * as React from "react";
import CircularProgress, {
  CircularProgressProps,
} from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { useSelector } from "react-redux";

export default function BookProgress(props) {
  const bookData = useSelector((state) => state.books);
  var progress = bookData?.bookshelfBooks?.bookProgress.filter(
    (book) => book.bookId === props.bookId
  );

  return (
    <Box sx={{ position: "relative", display: "inline-flex" }}>
      {progress &&
        progress?.map((book) => (
          <>
            <CircularProgress
              variant="determinate"
              color={
                book.progress <= 25
                  ? "info"
                  : book.progress <= 50
                  ? "success"
                  : book.progress <= 75
                  ? "error"
                  : "warning"
              }
              value={book.progress}
            />
            <Box
              sx={{
                top: 0,
                left: 0,
                bottom: 0,
                right: 0,
                position: "absolute",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Typography
                variant="caption"
                component="div"
                color="secondary"
              >{`${book.progress}%`}</Typography>
            </Box>
          </>
        ))}
    </Box>
  );
}

// export default function BookProgress() {
//   const [progress, setProgress] = React.useState(0);

//   React.useEffect(() => {
//     const timer = setInterval(() => {
//       setProgress((prevProgress) =>
//         prevProgress >= 100 ? 0 : prevProgress + 10
//       );
//     }, 800);
//     return () => {
//       clearInterval(timer);
//     };
//   }, []);

//   return <CircularProgressWithLabel value={progress} />;
// }
