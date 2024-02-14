const Book = require("./model");

// Adds a new book to the database
const addBook = async (req, res) => {
  try {
    // Creates a new book instance with the given properties
    const book = await Book.create({
      title: req.body.title,
      AuthorId: req.body.AuthorId,
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
    const books = await Book.findAll({
      include: ["Genre", "Author"],
      attributes: { exclude: ["GenreId", "AuthorId"] },
    });

    res.status(200).json({ books: books });
  } catch (error) {
    // Returns an error response with the error message and details
    res.status(500).json({ message: error.message, error: error });
  }
};

// Returns a book by title in the database
const getBookByTitle = async (req, res) => {
  try {
    // Extracts the title from the request body
    const { title } = req.body;

    // Checks if the title is provided
    if (!title) {
      return res
        .status(400)
        .json({ message: "Title is required in the request body" });
    }

    // Finds the book with the given title
    const book = await Book.findOne({
      where: { title: title },
      include: ["Genre", "Author"],
    });

    // Checks if the book exists
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    // Returns a response with the found book
    res.status(200).json({ book: book });
  } catch (error) {
    // Returns an error response with the error message and details
    res.status(500).json({ message: error.message, error: error });
  }
};

// Updates the author of a book with the given title
const updateAuthor = async (req, res) => {
  try {
    // Extracts the title and author from the request body
    const { title, AuthorId } = req.body;

    // Finds the book with the given title
    const book = await Book.findOne({ where: { title: title } });

    // Checks if the book exists
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    // Updates the author of the book
    book.AuthorId = AuthorId;
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

// Delete all books in the database

const deleteAllBooks = async (req, res) => {
  try {
    // Deletes all books in the database
    await Book.destroy({
      where: {},
      truncate: false,
    });

    // Returns a response with a success message
    res.status(200).json({ message: "All books deleted" });
  } catch (error) {
    // Returns an error response with the error message and details
    res.status(500).json({ message: error.message, error: error });
  }
};

// Returns a list of all books by AuthorId
const getAllBooksByAuthor = async (req, res) => {
  try {
    // Extracts the author ID from the query parameters
    const authorId = req.body.AuthorId;

    // Check if AuthorId is present in the query parameters
    if (!authorId) {
      return res
        .status(400)
        .json({ message: "AuthorId is required in the query parameters" });
    }

    // Finds all books by the specified author
    const books = await Book.findAll({
      where: { AuthorId: authorId },
      include: ["Genre", "Author"],
      attributes: { exclude: ["GenreId", "AuthorId"] },
    });

    // Returns a response with the list of books by the author
    res.status(200).json({ books: books });
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
  deleteAllBooks: deleteAllBooks,
  getAllBooksByAuthor: getAllBooksByAuthor,
  getBookByTitle: getBookByTitle,
};
