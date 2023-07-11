const express = require("express");
const router = express.Router();

const NewUser = require("../models/NewUser");
const BookAdd = require("../models/AddBook");
const BookList = require("../models/BookList");

router.post("/addbook/:user_id/:book_id", async (req, res) => {
  const { user_id, book_id } = req.params;

  try {
    // Check if the user exists
    let userid = user_id;
    const userExists = await NewUser.find({ userid });
    if (!userExists) {
      return res.status(404).json({ message: "User not found", status: 404 });
    }

    // Check if the book exists
    let id = book_id;
    const bookExists = await BookList.find({ id });
    if (!bookExists) {
      return res.status(404).json({ message: "Book not found", status: 404 });
    }

    // Create a new reading list entry
    const readingListEntry = new BookAdd({
      user_id,
      book_id,
      progress: 0,
      created_on: new Date(),
      created_by: user_id,
    });
    console.log("obj", readingListEntry);

    // Save the reading list entry
    await readingListEntry.save();

    res
      .status(200)
      .json({ message: "Book added to Bookshelf successfully", status: 200 });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error", status: 500 });
  }
});

router.get("/books", async (req, res) => {
  try {
    const books = await BookList.find();

    res.json(books);
    //console.log("books", books);
  } catch (error) {
    console.error("Error getting books:", error);
    res.status(500).json({ message: "Internal server error", status: 500 });
  }
});

router.get("/bookshelfbooks/:userId", async (req, res) => {
  const userId = req.params.userId;

  try {
    // Retrieve all book IDs added by the user from the addbook collection
    const userBooks = await BookAdd.find({ user_id: userId });

    // Extract book IDs from the userBooks
    const bookIds = userBooks.map((book) => book.book_id);
    console.log("api bookIds", bookIds);
    // Retrieve book information based on the book IDs from the booklist collection
    const books = await BookList.find({ id: bookIds });

    // Return the books to the frontend
    //console.log("api books", books);
    res.json(books);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "An error occurred while retrieving books.",
      status: 500,
    });
  }
});

module.exports = router;
