// Import the necessary modules
const { DataTypes } = require("sequelize");

// Import the sequelize connection
const sequelize = require("../db/connection");

// Define the Genre model
const Genre = sequelize.define(
  "Genre",
  {
    // Define the columns of the Genre model
    name: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
  },
  // Disable the automatic timestamps
  { timestamps: false }
);

// Export the Genre model
module.exports = Genre;
