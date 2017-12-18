// var express = require("express");
//
// var router = express.Router();
//
// // Import the model (cat.js) to use its database functions.
// var book = require("../models");
//
// // Create all our routes and set up logic within those routes where required.
// router.get("/api", function(req, res) {
//   book.all(function(data) {
//     var hbsObject = {
//       book: data
//     };
//     console.log(hbsObject);
//     res.render("index", hbsObject);
//   });
// });
//
// router.post("/api/books", function(req, res) {
//   book.create([
//     "title", "isbn"
//   ], [
//     req.body.title, req.body.isbn
//   ], function(result) {
//     // Send back the ID of the new quote
//     res.json({ id: result.insertId });
//   });
// });
//
//
// router.post("/", function(req, res) {
//   console.log(req.body)
// })
//
// // Export routes for server.js to use.
// module.exports = router;
