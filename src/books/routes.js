// Import the necessary modules
const { Router } = require("express");
const bookRouter = Router();

// Import the controller functions
const {
  addBook,
  getAllBooks,
  updateAuthor,
  deleteBookByTitle,
  deleteAllBooks,
  getAllBooksByAuthor,
  getBookByTitle,
} = require("./controllers");

// Define the routes
bookRouter.post("/books/addBook", addBook);
bookRouter.get("/books/getAllBooks", getAllBooks);
bookRouter.put("/books/updateAuthor", updateAuthor);
bookRouter.delete("/books/deleteBookByTitle", deleteBookByTitle);
bookRouter.delete("/books/deleteAllBooks", deleteAllBooks);
bookRouter.get("/books/getAllBooksByAuthor", getAllBooksByAuthor);
bookRouter.get("/books/getBookByTitle", getBookByTitle);

// Export the router
module.exports = bookRouter;
