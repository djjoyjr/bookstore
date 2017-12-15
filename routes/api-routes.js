// Dependencies
// =============================================================
var Book = require("../models/book.js");
var db = require("../models");
var passport = require("../config/passport");

//Passport routes
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

};

//Other Routes
//=============================================================
// module.exports = function(app) {
//   // Get all books
//   app.get("/api/all", function(req, res) {
//     Book.findAll({}).then(function(results) {
//       res.json(results);
//     });
//   });
//
//   // Get a specific book
//   app.get("/api/:book", function(req, res) {
//     if (req.params.book) {
//       Book.findAll({
//         where: {
//           title: req.params.book
//         }
//       }).then(function(results) {
//         res.json(results);
//       });
//     }
//   });
//
//   // Get all books of a specific genre
//   app.get("/api/genre/:genre", function(req, res) {
//     if (req.params.genre) {
//       Book.findAll({
//         where: {
//           genre: req.params.genre
//         }
//       }).then(function(results) {
//         res.json(results);
//       });
//     }
//   });
//
//   // Get all books from a specific author
//   app.get("/api/author/:author", function(req, res) {
//     if (req.params.author) {
//       Book.findAll({
//         where: {
//           author: req.params.author
//         }
//       }).then(function(results) {
//         res.json(results);
//       });
//     }
//   });
//
//   // Add a book
//   app.post("/api/new", function(req, res) {
//     console.log("Book Data:");
//     console.log(req.body);
//     Book.create({
//       title: req.body.title,
//       author: req.body.author,
//       genre: req.body.genre,
//       pages: req.body.pages
//     });
//   });
//
//   // Delete a book
//   app.post("/api/delete", function(req, res) {
//     console.log("Book Data:");
//     console.log(req.body);
//     Book.destroy({
//       where: {
//         id: req.body.id
//       }
//     });
//   });
// };
