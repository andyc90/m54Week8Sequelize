const Book = require("./model");

// Adds a new book to the database
const addBook = async (req, res) => {
  try {
    // Creates a new book instance with the given properties
    const book = await Book.create({
      title: req.body.title,
      author: req.body.author,
      GenreId: req.body.GenreId,
    });

    // Returns a response with the created book and a success message
    res.status(201).json({ message: `${book.title} was added`, book: book });
  } catch (error) {
    // Returns an error response with the error message and details
    res.status(500).json({ message: error.message, error: error });
  }
};

// Returns a list of all books in the database
const getAllBooks = async (req, res) => {
  try {
    // Finds all books in the database and returns them
    const books = await Book.findAll({ include: "Genre" });
    res.status(200).json({ books: books });
  } catch (error) {
    // Returns an error response with the error message and details
    res.status(500).json({ message: error.message, error: error });
  }
};

// Updates the author of a book with the given title
const updateAuthor = async (req, res) => {
  try {
    // Extracts the title and author from the request body
    const { title, author } = req.body;

    // Finds the book with the given title
    const book = await Book.findOne({ where: { title: title } });

    // Checks if the book exists
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    // Updates the author of the book
    book.author = author;
    await book.save();

    // Returns a response with a success message and the updated book
    res.status(200).json({ message: "Author updated", book: book });
  } catch (error) {
    // Returns an error response with the error message and details
    res.status(500).json({ message: error.message, error: error });
  }
};

// Deletes a book with the given title from the database
const deleteBookByTitle = async (req, res) => {
  try {
    // Extracts the title from the request body
    const { title } = req.body;

    // Finds the book with the given title
    const book = await Book.findOne({ where: { title: title } });

    // Checks if the book exists
    if (!book) {
      return res
        .status(404)
        .json({ error: "No book found with the specified title" });
    }

    // Deletes the book
    await book.destroy();

    // Returns a response with a success message and the deleted book
    res.status(200).json({ message: "Book deleted", deletedBook: book });
  } catch (error) {
    // Returns an error response with the error message and details
    res.status(500).json({ message: error.message, error: error });
  }
};

// Exports the functions
module.exports = {
  addBook: addBook,
  getAllBooks: getAllBooks,
  updateAuthor: updateAuthor,
  deleteBookByTitle: deleteBookByTitle,
};
