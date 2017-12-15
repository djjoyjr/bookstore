var path = require("path");
var request = require('request');

var isAuthenticated = require("../config/middleware/isAuthenticated");

module.exports = function(app) {

  app.get("/", function(req, res) {
    if (req.user) {
      res.render("index");
    }
    res.sendFile(path.join(__dirname, "../public/homepage.html"));
  });

  app.post("/", function(req, res) {
    console.log(req.body);
    request("https://www.googleapis.com/books/v1/volumes?q=" +req.body.title+ "&key=AIzaSyDXm-wes9X-wKaHq0h2vDsVhKgfL6SI_A4", function (error, response, body) {
      // console.log('error:', error); // Print the error if one occurred
      // console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
      console.log('body:', body); // Print the HTML for the Google homepage.
      res.render("index");
    });
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
