import * as React from "react";
import CircularProgress, {
  CircularProgressProps,
} from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { useSelector } from "react-redux";

export default function BookProgress(props) {
  //const { percentage, bookId } = props;
  //const [progress, setProgress] = useState(percentage);
  //const bookData = useSelector((state) => state.books);
  return (
    <Box sx={{ position: "relative", display: "inline-flex" }}>
      <>
        <CircularProgress variant="determinate" {...props} />
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
          >{`${props.percentage ? props.percentage : 0}%`}</Typography>
        </Box>
      </>
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
