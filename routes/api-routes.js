// Dependencies
// =============================================================
var Book = require("../models/book.js");
var db = require("../models");
var passport = require("../config/passport");

module.exports = function(app) {
  app.post("/api/login", passport.authenticate("local"), function(req, res) {
    res.json("/members");
  });

  app.post("/api/signup", function(req, res) {
    console.log(req.body);
    db.User.create({
      email: req.body.email,
      password: req.body.password
    }).then(function() {
      res.redirect(307, "/api/login");
    }).catch(function(err) {
      console.log(err);
      res.json(err);
    });
  });

  app.get("/logout", function(req, res) {
    req.logout();
    res.redirect("/");
  });

  app.get("/api/user_data", function(req, res) {
    if (!req.user) {
      res.json({});
    }
    else {
      res.json({
        email: req.user.email,
        id: req.user.id
      });
    }
  });
  app.post("/api/books", function(req, res) {
    db.Book.create({
      title: req.body.title,
      author: req.body.author,
      isbn: req.body.isbn,
      description: req.body.description,
      UserId: req.user.id
    }).then(function(dbBook) {
      res.redirect("/members");
    });
  });

  app.put("/api/books/", function(req, res) {
    console.log("Updating keep to: " +req.body.keep);
    console.log("For book wih id: " +req.body.id);
    db.Book.update({
      keep: req.body.keep
    }, {
      where: {
        id: req.body.id
      }
    }).then(function(dbBook) {
        res.json(dbBook);
    });
  });
};
