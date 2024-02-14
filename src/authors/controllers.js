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

// Exports the functions
module.exports = {
  addAuthor: addAuthor,
  getAllAuthors: getAllAuthors,
};
