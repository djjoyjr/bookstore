// Dependencies
// =============================================================
var Book = require("../models/book.js");
var db = require("../models");
var passport = require("../config/passport");
var isAuthenticated = require("../config/middleware/isAuthenticated");


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

  app.get("/api/all", isAuthenticated, function (req, res) {
    db.Book.findAll({
      where: {
        UserId: req.user.id
      }
    }).then(function (dbBook) {
      res.render("index", {books: dbBook});
    });
  });

  app.get("/api/sell", isAuthenticated, function (req, res) {
    db.Book.findAll({
      where: {
        UserId: req.user.id,
        keep: 0
      }
    }).then(function (dbBook) {
      res.render("index", {books: dbBook});
    });
  });

  app.get("/api/keep", isAuthenticated, function (req, res) {
    db.Book.findAll({
      where: {
        UserId: req.user.id,
        keep: 1
      }
    }).then(function (dbBook) {
      res.render("index", {books: dbBook});
    });
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
      UserId: req.user.id,
      thumbnail: req.body.thumbnail
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

  app.get("/api/books/:id", function(req,res){
    db.Book.findAll({
      where: {
        id: req.params.id
      }
    }).then(function(data){
        res.json(data)
      });
  });

  app.post("/api/amazon/", function(req,res){
    console.log(req.body.isbn);
    console.log(req.body.title);

    var title = req.body.title;
    var isbn = req.body.isbn;

      function amazonQuery() {
        var details = require('../details');
        const {OperationHelper} = require('apac');
        const opHelper = new OperationHelper({
            awsId: process.env.awsId || details.AccessId,
            awsSecret: process.env.awsSecret || details.Secret,
            assocId: process.env.assocId || details.Tag,
            locale: 'US'
        });

        opHelper.execute('ItemSearch', {
          'SearchIndex': 'Books',
          'IdType': 'ISBN',
          'ItemId' : isbn,
          'Title': title,
          'ResponseGroup': 'ItemAttributes, Offers, Images'
        }).then((response) => {
          // console.log("Results object: ", response.result);
          // console.log("***************************************************\n");
          // console.log("Amazon Page: ", response.result.ItemSearchResponse.Items.Item[0].DetailPageURL);
          // console.log("***************************************************\n");
          // console.log("Item Attributes: ", response.result.ItemSearchResponse.Items.Item[0].ItemAttributes);
          // console.log("Lowest Used Price: ", response.result.ItemSearchResponse.Items.Item[0].OfferSummary.LowestUsedPrice.FormattedPrice);
          // console.log("***************************************************\n");
          // console.log("For Sale Info from Amazon: ", response.result.ItemSearchResponse.Items.Item[0].OfferSummary);
          res.json(response.result.ItemSearchResponse.Items.Item[0].OfferSummary);
        }).catch((err) => {
            console.error("Something went wrong! ", err);
        });
      };
      amazonQuery();
  });

};
