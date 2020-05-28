
// var scraperdb = require("../models");


  // Load index page
  module.exports = function(app){

  app.get("/", function(req, res) {
    res.render("index");
  });

  app.get("/saved", function(req, res) {
    res.render("saved");
  });
  }

