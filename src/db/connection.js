// Import the required package
const { Sequelize } = require("sequelize");

// Create a new instance of Sequelize
const sequelize = new Sequelize(process.env.MYSQL_URI);

// Authenticate the connection
sequelize.authenticate().then(() => {
  // Log a message to the console indicating that the connection was successful
  console.log("DB connection is working");
});

// Export the sequelize instance
module.exports = sequelize;
