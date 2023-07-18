const express = require("express");
const cors = require("cors");
const connectDB = require("./dbConfig");
const userRoutes = require("./routes/userRoutes");
const bookRoutes = require("./routes/bookRoutes");
const path = require("path");
const PORT = 3002;
connectDB();

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Mount routes
app.use("/api", userRoutes);
app.use("/api", bookRoutes);

const buildPath = path.join(__dirname, "../app/build");
app.use(express.static(buildPath));
app.get("/*", function (req, res) {
  res.sendFile(path.join(__dirname, "../app/build/index.html"), function (err) {
    if (err) {
      res.status(500).send(err);
    }
  });
});

// Start the server
// app.listen(process.env.PORT, process.env.IP_ADDRESS, () => {
//   console.log(`Server is running on port ${process.env.PORT}`);
// });
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
