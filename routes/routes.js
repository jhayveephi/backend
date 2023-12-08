const router = require("express").Router();
let Book = require("../models/booklist.js");

// Get all books
router.get("/", async (req, res) => {
  try {
    const result = await Book.find({});
    res.status(200).json(result);
  } catch (error) {
    console.error("Error fetching all books:", error);
    res.status(500).json({ error: "Server Error" });
  }
});

// Get a single book by id
router.get("/:id", async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) {
      return res.status(404).json({ error: "Book not found" });
    }
    res.status(200).json(book);
  } catch (error) {
    console.error("Error fetching a single book:", error);
    res.status(500).json({ error: "Server Error" });
  }
});

// Add/save new book
router.post("/", async (req, res) => {
  const { title, author, description, pages } = req.body;

  if (!title || !author) {
    return res.status(400).json({ error: "Title and author are required" });
  }

  try {
    const newBook = new Book({ title, author, description, pages });
    await newBook.save();
    res.status(201).json({ message: "Book added successfully", book: newBook });
  } catch (error) {
    console.error("Error adding a new book:", error);
    res.status(500).json({ error: "Server Error" });
  }
});

// Update book by id
router.put("/:id", async (req, res) => {
  const { title, author, description, pages } = req.body;

  if (!title || !author) {
    return res.status(400).json({ error: "Title and author are required" });
  }

  try {
    const updatedBook = await Book.findByIdAndUpdate(
      req.params.id,
      { title, author, description, pages },
      { new: true }
    );

    if (!updatedBook) {
      return res.status(404).json({ error: "Book not found" });
    }

    res.status(200).json({ message: "Book updated successfully", book: updatedBook });
  } catch (error) {
    console.error("Error updating a book:", error);
    res.status(500).json({ error: "Server Error" });
  }
});

// Delete book by id
router.delete("/:id", async (req, res) => {
  try {
    const deletedBook = await Book.findByIdAndDelete(req.params.id);

    if (!deletedBook) {
      return res.status(404).json({ error: "Book not found" });
    }

    res.status(200).json({ message: "Book deleted successfully", book: deletedBook });
  } catch (error) {
    console.error("Error deleting a book:", error);
    res.status(500).json({ error: "Server Error" });
  }
});

module.exports = router;
