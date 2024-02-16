// Import the necessary modules
const { Router } = require("express");
const genreRouter = Router();

// Import the controller functions
const { addGenre, getAllGenres, getBooksByGenre } = require("./controllers");

// Define the routes
genreRouter.post("/genres/addGenre", addGenre);
genreRouter.get("/genres/getAllGenres", getAllGenres);
genreRouter.get("/genres/getBooksByGenre/:name", getBooksByGenre);

// Export the router
module.exports = genreRouter;
