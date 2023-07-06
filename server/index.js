// import express from "express";
// import bodyParser from "body-parser";
// import User

// const app = express();
const express = require("express");
const connectDB = require("./dbConfig");
const bodyParser = require("body-parser");
const BookAdd = require("./models/AddBook");
const NewUser = require("./models/NewUser");
const cors = require("cors");

const app = express();
const PORT = 3002;

app.use(bodyParser.json());
app.use(cors());
connectDB();
const baseURL = `http://localhost:${PORT}`;
// const express = require("express");
// const connectDB = require("./dbConfig");
// const User = require("./models/userSchema");

// const app = express();

// const port = process.env.PORT || 3002;

app.use(express.json());
//
// // Create a new user

app.post("/api/register", async (req, res) => {
  const { username, userid, email, password } = req.body;
  try {
    // Create a new user object
    const newUser = new NewUser({ username, userid, email, password });

    // Save the user to the database
    await newUser.save();

    res
      .status(200)
      .json({ message: "User registered successfully", status: 200 });
  } catch (error) {
    if (error.code === 11000 && error.name === "MongoServerError") {
      // Duplicate key error occurred
      // Customize and display the error message to the user
      //const duplicateKey = error.keyValue?.email;
      const errorMessage = `The email address '${email}' already registered. Please login!.`;
      res.status(200).json({ error: errorMessage });
    } else {
      // Handle other errors
      res.status(500).json({ error: "Internal server error" });
    }
  }
});

// Get all users
app.get("/api/users", async (req, res) => {
  try {
    const users = await NewUser.find();

    res.json(users);
  } catch (error) {
    console.error("Error getting users:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.post("/api/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find the user based on the provided email
    const user = await NewUser.findOne({ email });
    console.log("email", user.email);
    console.log("user", user);
    // Check if the user exists
    if (!user) {
      return res.status(404).json({
        message: "Account doesn't exist! Please register!",
        status: 404,
      });
    }

    // Validate the password
    //const isPasswordValid = user.password === password;

    if (user.password !== password) {
      return res.status(401).json({ message: "Invalid credentials", status: 401 });
    }
    if (user.email === email) {
      res.json({ message: "Login successful", status: 200 });
    }
    // User login successful
    // You can generate and send a token for authentication or handle the login response in your desired way
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error", status: 500 });
  }
});

app.get('/users/:id', async (req, res) => {
  const userId = req.params.id;

  try {
    // Find the user by ID
    const user = await User.findById(userId);

    // Check if the user exists
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Return the user data
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// app.get("/mybookshelf", async (req, res) => {
//   try {
//     const books = await BookAdd.find();

//     res.json(books);
//   } catch (error) {
//     console.error("Error getting users:", error);
//     res.status(500).json({ error: "Internal server error" });
//   }
// });

// app.post("/addbook", async (req, res) => {
//   try {
//     // Extract the required data from the request body
//     const { email, user_id, book_id, created_by } = req.body;

//     // Create a new instance of the BookAdd model with the provided data
//     const newBook = new BookAdd({
//       email,
//       user_id,
//       book_id,
//       created_on: new Date(),
//       created_by,
//     });

//     // Save the new book to the database
//     await newBook.save();

//     // Return a success response
//     res.status(200).json({ message: "Book added successfully" });
//   } catch (error) {
//     // Handle any errors that occur during the process
//     console.error("Error adding book:", error);
//     res.status(500).json({ error: "Failed to add book" });
//   }
// });

app.listen(PORT, () => {
  console.log("Server Connected to port " + PORT);
});
