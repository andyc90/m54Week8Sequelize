// Import the necessary modules
const { Router } = require("express");
const authorRouter = Router();

// Import the controller functions
const { addAuthor, getAllAuthors } = require("./controllers");

// Define the routes
authorRouter.post("/authors/addAuthor", addAuthor);
authorRouter.get("/authors/getAllAuthors", getAllAuthors);

// Export the router
module.exports = authorRouter;
