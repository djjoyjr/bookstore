var path = require("path");
var isAuthenticated = require("../config/middleware/isAuthenticated");
var db = require("../models");
var currentUserId = "";

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
      app.get("/api/user_data"),(function(data) {
        currentUserId = data.id;
      });
    db.Book.findAll({
    }, {
      where: {
        UserId: currentUserId
      }
    }).then(function(dbBook) {
    console.log(dbBook);
    res.render("index", {books: dbBook});
    });
  });

};
