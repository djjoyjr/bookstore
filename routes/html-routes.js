var path = require("path");
var isAuthenticated = require("../config/middleware/isAuthenticated");
var db = require("../models");

module.exports = function(app) {

  app.get("/", function(req, res) {
    if (req.user) {
      res.render("index");
    }
      console.log("1 this runs ");

    res.sendFile(path.join(__dirname, "../public/homepage.html"));
  });

  app.get("/login", function(req, res) {
    if (req.user) {
      res.render("index");
    }
    res.sendFile(path.join(__dirname, "../public/homepage.html"));
  });

  app.get("/members", isAuthenticated, function(req, res) {
    // console.log("4: email: " +req.user.email);
    // console.log("4: id: " + req.user.id);
    db.Book.findAll({
      where: {
        UserId: req.user.id
      }
    }).then(function(dbBook) {
    console.log(dbBook);
    res.render("index", {books: dbBook});
    });
  });

};
