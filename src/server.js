// Load environment variables from .env file
require("dotenv").config();

// Import dependencies
const express = require("express");

// Import models
const Book = require("./books/model");
const Genre = require("./genres/model");

// Import routes
const bookRouter = require("./books/routes");
const genreRouter = require("./genres/routes");

// Set port
const port = process.env.PORT || 5001;

// Create express app
const app = express();

// Parse JSON requests
app.use(express.json());

// Use routes
app.use(bookRouter);
app.use(genreRouter);

// Sync database tables
const syncTables = async () => {
  await Book.sync();
  await Genre.sync();
};

// Health check route
app.get("/health", (req, res) => {
  res.status(200).json({ message: "API is healthy" });
});

// Start server and sync tables
app.listen(port, () => {
  syncTables();
  console.log(`Server is listening on port ${port}`);
});
