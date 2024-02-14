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

// Exports the functions
module.exports = {
  addGenre: addGenre,
  getAllGenres: getAllGenres,
};
