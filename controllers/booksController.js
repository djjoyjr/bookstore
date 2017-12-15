var express = require("express");

var router = express.Router();

// Import the model (cat.js) to use its database functions.
var book = require("../models");

// Create all our routes and set up logic within those routes where required.
router.get("/api", function(req, res) {
  book.all(function(data) {
    var hbsObject = {
      book: data
    };
    console.log(hbsObject);
    res.render("index", hbsObject);
  });
});

router.post("/api/books", function(req, res) {
  book.create([
    "title", "isbn"
  ], [
    req.body.title, req.body.isbn
  ], function(result) {
    // Send back the ID of the new quote
    res.json({ id: result.insertId });
  });
});


router.post("/", function(req, res) {
  console.log(req.body)
})
// router.put("/api/books/:id", function(req, res) {
//   var condition = "id = " + req.params.id;
//
//   console.log("condition", condition);
//
//   book.update({
//     sleepy: req.body.sleepy
//   }, condition, function(result) {
//     if (result.changedRows == 0) {
//       // If no rows were changed, then the ID must not exist, so 404
//       return res.status(404).end();
//     } else {
//       res.status(200).end();
//     }
//   });
// });

// Export routes for server.js to use.
module.exports = router;
