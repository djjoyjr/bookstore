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
    var searchTerm ="";
    if (req.body.title) {
      searchTerm = req.body.title;
    };
    if (req.body.isbn) {
      searchTerm = req.body.isbn;
    };
    // console.log(req.body);
    // console.log("****************************************\n");
    // console.log("Title:  " +req.body.title);
    // console.log("ISBN:  " +req.body.isbn);
    // console.log("****************************************\n");
    request("https://www.googleapis.com/books/v1/volumes?q=" +searchTerm+ "&key=AIzaSyDXm-wes9X-wKaHq0h2vDsVhKgfL6SI_A4&fields=items(volumeInfo/title)", function (error, response, body) {
      // console.log('error:', error); // Print the error if one occurred
      // console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
      console.log("****************************************\n");
      console.log('body:', body); // Print the HTML for the Google homepage.
      console.log("****************************************\n");
      // console.log("********************************************************************************************************************* ***\n");
      // console.log(Object.values(body)); // Print the HTML for the Google homepage.
      // console.log("************************************************************************************************************************\n");

    });
    res.render("index");

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
