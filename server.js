// dependencies


var express = require("express");

var exphbs = require("express-handlebars");

var mongoose = require("mongoose");

// scraping tools needed

var axios = require("axios");


var cheerio = require ("cheerio");

// our models

var db = require("./models");

var PORT = 3000;

// initialize
// require("./routes/apiRoutes")(app);
var app = express();

// middleware

app.use(express.urlencoded({ extended:true}));
app.use(express.json());
app.use(express.static("public"));

app.engine(
    "handlebars",
    exphbs({
      defaultLayout: "main"
    })
  );
  app.set("view engine", "handlebars");
  
  require("./routes/htmlRoutes")(app);
mongoose.connect("mongodb://localhost/scraperdb", {useNewUrlParser:true});


app.listen(PORT ,function(){
    console.log("APP RUNNING ON PORT " + PORT);
});

module.exports = app;
