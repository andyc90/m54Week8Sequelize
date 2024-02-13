const { Router } = require("express");
const bookRouter = Router();

const {
  addBook,
  getAllBooks,
  updateAuthor,
  deleteBookByTitle,
} = require("./controllers");

bookRouter.post("/books/addBook", addBook);
bookRouter.get("/books/getAllBooks", getAllBooks);
bookRouter.put("/books/updateAuthor", updateAuthor);
bookRouter.delete("/books/deleteBookByTitle", deleteBookByTitle);

module.exports = bookRouter;
