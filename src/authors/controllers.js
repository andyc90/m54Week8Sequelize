const Author = require("./model");

// Adds an author to the database
const addAuthor = async (req, res) => {
  try {
    const author = await Author.create({
      name: req.body.name,
    });

    res
      .status(201)
      .json({ message: `${author.name} was added`, author: author });
  } catch (error) {
    res.status(500).json({ message: error.message, error: error });
  }
};

// Gets all authors from the database
const getAllAuthors = async (req, res) => {
  try {
    const authors = await Author.findAll();
    res.status(200).json({ authors: authors });
  } catch (error) {
    res.status(500).json({ message: error.message, error: error });
  }
};

// Returns a list of all books by Author
const getBooksByAuthor = async (req, res) => {
  try {
    // Extracts the author ID from the query parameters
    const name = req.params.name;

    // Check if AuthorId is present in the query parameters
    if (!name) {
      return res
        .status(400)
        .json({ message: "Author name is required in the URL parameters" });
    }

    // Finds all books by the specified author
    const books = await Author.findAll({
      where: { name: name },
      include: ["Books"],
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
  addAuthor: addAuthor,
  getAllAuthors: getAllAuthors,
  getBooksByAuthor: getBooksByAuthor,
};
