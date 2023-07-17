const express = require("express");
const cors = require("cors");
const connectDB = require("./dbConfig");
const userRoutes = require("./routes/userRoutes");
const bookRoutes = require("./routes/bookRoutes");

const PORT = 3002;
// const ipAddress = "10.31.21.201"
connectDB();

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Mount routes
app.use("/api", userRoutes);
app.use("/api", bookRoutes);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
