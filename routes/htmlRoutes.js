
// var scraperdb = require("../models");


  // Load index page
  module.exports = function(app){

  app.get("/", function(req, res) {
    res.render("index");
  });
  }

  