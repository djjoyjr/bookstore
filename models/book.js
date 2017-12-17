// Sequelize (capital) references the standard library
var Sequelize = require("sequelize");
// sequelize (lowercase) references my connection to the DB.
var sequelize = require("../config/connection.js");

// Creates a "Book" model that matches up with DB
module.exports = function(sequelize, DataTypes) {
var Book = sequelize.define("Book", {
  title: {
    type: Sequelize.STRING
  },
  author: {
    type: Sequelize.STRING
  },
  isbn: {
    type: Sequelize.STRING
  },
  description: {
    type: Sequelize.TEXT
  },
  keep: {
    type: Sequelize.BOOLEAN,
    defaultValue: true
  }
}, {
  timestamps: false
});
Book.associate = function(models) {
  Book.belongsTo(models.User, {
    foreignKey: {
      allowNull: false
    }
  });
};
return Book;
};
