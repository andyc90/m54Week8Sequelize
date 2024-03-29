// Import the necessary modules
const { DataTypes } = require("sequelize");

// Import the sequelize connection
const sequelize = require("../db/connection");

// Define the Book model
const Book = sequelize.define(
  "Book",
  {
    // Define the columns of the Book model
    title: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
  },
  {
    // Disable the automatic timestamps
    timestamps: false,
  }
);

// Export the Book model
module.exports = Book;
