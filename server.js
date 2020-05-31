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
 

  
 
  mongoose.connect(
    process.env.MONGODB_URI ||
    "mongodb://user1:password1@ds155820.mlab.com:55820/heroku_n09hc9c4"
  );


  
app.listen(PORT ,function(){
    console.log("APP RUNNING ON PORT " + PORT);
});

module.exports = app;
