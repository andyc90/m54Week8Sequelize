const Genre = require("./model");

// Adds a genre to the database
const addGenre = async (req, res) => {
  try {
    const genre = await Genre.create({
      name: req.body.name,
    });

    res.status(201).json({ message: `${genre.name} was added`, genre: genre });
  } catch (error) {
    res.status(500).json({ message: error.message, error: error });
  }
};

// Gets all genres from the database
const getAllGenres = async (req, res) => {
  try {
    const genres = await Genre.findAll();
    res.status(200).json({ genres: genres });
  } catch (error) {
    res.status(500).json({ message: error.message, error: error });
  }
};

// Returns a list of books by Genre
const getBooksByGenre = async (req, res) => {
  try {
    // Extracts the GenreID from the URL parameters
    const name = req.params.name;

    // Check if Genre name is present in the URL parameters
    if (!name) {
      return res
        .status(400)
        .json({ message: "Genre name is required in the URK parameters" });
    }

    // Finds all books by the specified genre
    const books = await Genre.findAll({
      where: { name: name },
      include: ["Books"],
      attributes: { exclude: ["GenreId", "AuthorId"] },
    });

    // Returns a response with the list of books by the genre
    res.status(200).json({ books: books });
  } catch (error) {
    // Returns an error response with the error message and details
    res.status(500).json({ message: error.message, error: error });
  }
};

// Exports the functions
module.exports = {
  addGenre: addGenre,
  getAllGenres: getAllGenres,
  getBooksByGenre: getBooksByGenre,
};
