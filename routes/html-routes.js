var path = require("path");
var isAuthenticated = require("../config/middleware/isAuthenticated");
var db = require("../models");

module.exports = function(app) {

  app.get("/", function(req, res) {
    if (req.user) {
      res.redirect("/members");
    }
    res.sendFile(path.join(__dirname, "../public/homepage.html"));
  });

  app.get("/login", function(req, res) {
    if (req.user) {
      res.redirect("/members");
    }else{
      res.sendFile(path.join(__dirname, "../public/homepage.html"));
    }
  });

  app.get("/members", isAuthenticated, function(req, res) {
    // console.log("4: email: " +req.user.email);
    // console.log("4: id: " + req.user.id);
    db.Book.findAll({
      where: {
        UserId: req.user.id
      }
    }).then(function(dbBook) {
    // console.log(dbBook);
    res.render("index", {books: dbBook});
    res.end();
    });
  });

  app.delete("/api/books/:id", function(req, res) {
    // We just have to specify which todo we want to destroy with "where"
    db.Book.destroy({
      where: {
        id: req.params.id
      }
    }).then(function(dbBook) {
      res.json(dbBook);
    });
  });



};
