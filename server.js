// *********************************************************************************
// Server.js - This file is the initial starting point for the Node/Express server.
// *********************************************************************************

// Dependencies
// =============================================================
var express = require("express");
var bodyParser = require("body-parser");
var session = require("express-session");
var passport = require("./config/passport");

// Sets up the Express App
// =============================================================
var app = express();
var PORT = process.env.PORT || 8080;
var db = require("./models");


// Sets up the Express app to handle data parsing
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));
app.use(session({ secret: "keyboard cat", resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());


// Static directory
app.use(express.static("/public"));

// Routes
// =============================================================
require("./routes/api-routes.js")(app);
require("./routes/html-routes.js")(app);

// Starts the server to begin listening
// =============================================================
db.sequelize.sync().then(function() {
app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});
});