const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  description: { type: String },
  Pages: { type: String },
});

const Book = mongoose.model("Book", bookSchema, "300350408-jerome");
module.exports = Book;
