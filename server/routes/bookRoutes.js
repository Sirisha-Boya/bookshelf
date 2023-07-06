const express = require("express");
const router = express.Router();

const NewUser = require("../models/NewUser");
const BookAdd = require("../models/AddBook");

router.post('/', async (req, res) => {
    const { user_id, book_id } = req.body;
  
    try {
      // Check if the user exists
      const userExists = await NewUser.findById(user_id);
      if (!userExists) {
        return res.status(404).json({ message: 'User not found', status: 404 });
      }
  
      // Check if the book exists
      const bookExists = await BookAdd.findById(book_id);
      if (!bookExists) {
        return res.status(404).json({ message: 'Book not found', status: 404 });
      }
  
      // Create a new reading list entry
      const readingListEntry = new ReadingList({
        user_id,
        book_id,
        created_on: new Date(),
        created_by: 'Some user', // Set the created_by value accordingly
      });
  
      // Save the reading list entry
      await readingListEntry.save();
  
      res.status(200).json({ message: 'Book added to reading list successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
  