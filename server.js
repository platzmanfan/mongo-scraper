// dependencies


var express = require("express");

var exphbs = require("express-handlebars");

var mongoose = require("mongoose");

var logger = require('morgan')
var PORT = 3000;

// initialize
// require("./routes/apiRoutes")(app);
var app = express();

// middleware
app.use(logger('dev'));
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
  
  require("./routes/routes")(app);
 

  var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/scraperYahoodb";

  mongoose.connect(MONGODB_URI,function(err){
      if (err){
          console.log(Err)
      }
      else{
          console.log("mongoose succesfull")
      }
  });


  
app.listen(PORT ,function(){
    console.log("APP RUNNING ON PORT " + PORT);
});

module.exports = app;
