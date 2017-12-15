var path = require("path");

var isAuthenticated = require("../config/middleware/isAuthenticated");

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
    res.render("index");
  });

};
