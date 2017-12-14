
// Sequelize (capital) references the standard library
var Sequelize = require("sequelize");
// sequelize (lowercase) references my connection to the DB.
var sequelize = require("../config/connection.js");

// Creates a "Book" model that matches up with DB
module.exports = function(sequelize, DataTypes) {
var Book = sequelize.define("book", {
  title: {
    type: Sequelize.STRING
  },
  author: {
    type: Sequelize.STRING
  },
  genre: {
    type: Sequelize.STRING
  },
  isbn: {
    type: Sequelize.STRING
  }
}, {
  timestamps: false
});
return Book
}

// Syncs with DB
// Book.sync();
//
// // Makes the Book Model available for other files (will also create a table)
// module.exports = Book;
