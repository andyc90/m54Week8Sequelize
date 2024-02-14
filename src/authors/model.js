// Import the necessary modules
const { DataTypes } = require("sequelize");

// Import the sequelize connection
const sequelize = require("../db/connection");

// Define the Author model
const Author = sequelize.define(
  "Author",
  {
    // Define the columns of the Author model
    name: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
  },
  // Disable the automatic timestamps
  { timestamps: false }
);

// Export the Author model
module.exports = Author;
