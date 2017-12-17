var path = require("path");
var isAuthenticated = require("../config/middleware/isAuthenticated");
var db = require("../models");
var currentUserId = require("./api-routes.js");
console.log(currentUserId);

module.exports = function(app) {

  app.get("/", function(req, res) {
    if (req.user) {
      res.render("index");
    }

    res.sendFile(path.join(__dirname, "../public/homepage.html"));
  });

  app.get("/login", function(req, res) {
    if (req.user) {
      res.render("index");
    }
    res.sendFile(path.join(__dirname, "../public/homepage.html"));
  });

  app.get("/members", isAuthenticated, function(req, res) {

    db.Book.findAll({
    }, {
      where: {
        UserId: currentUserId
      }
    }).then(function(dbBook) {

    // console.log(dbBook);
    res.render("index", {books: dbBook});
    });
  });

};
