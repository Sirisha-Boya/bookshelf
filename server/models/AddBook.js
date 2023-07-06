const mongoose = require("mongoose");

const AddBook = new mongoose.Schema({
  user_id: {
    type: String,
    required: true,
  },
  book_id: {
    type: String,
    required: true,
  },
  progress: {
    type: Number,
  },
  created_on: {
    type: Date,
  },
  created_by: {
    type: String,
  },
  updated_on: {
    type: Date,
  },
  updated_by: {
    type: String,
  },
});

const BookAdd = mongoose.model("users-watchlist", AddBook);

module.exports = BookAdd;
