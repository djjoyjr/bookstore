// *********************************************************************************
// CONNECTION.JS - THIS FILE INITIATES THE CONNECTION TO MYSQL
// *********************************************************************************

// Dependencies
var Sequelize = require("sequelize");
var mysql = require("mysql");


// Creates mySQL connection using Sequelize
var sequelize = new Sequelize("bookstore_db", "root", null, {
  host: "localhost",
  dialect: "mysql",
  pool: {
    max: 5,
    min: 0,
    idle: 10000
  }
});

if (process.env.JAWSDB_URL) {
  connection = mysql.createConnection(process.env.JAWSDB_URL);
} else {
  connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "bookstore_db"
});
};

// Exports the connection for other files to use
module.exports = sequelize;
