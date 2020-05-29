var axios = require("axios");
var cheerio = require("cheerio");
var db = require("../models");


  // Load index page
  module.exports = function(app){

  app.get("/", function(req, res) {
    res.render("index");
  });

  app.get("/saved", function(req, res) {
    res.render("saved");
  });
  
  app.get("/scrape", function(req,res){
    axios.get("https://news.yahoo.com/").then(function(response){
        var $ = cheerio.load(response.data);
           
        $("div").each(function(i,element){
            var result = {};
        
        
            result.title= $(this)
            .children("h3")
            .text()
            result.url = $(this)
            .children("h3")
            .children("a")
            .attr("href")
            result.paragraph = $(this)
            .children("p")
            .text()
            
            
            db.article.create(result)
            .then(function(dbArticle){
                console.log(dbArticle);
            })
            .catch(function(err){
                console.log(err);
            })
        
        })
            console.log(result)
    });
    res.send("SCRAPE COMPLETE")
});

app.get("/articles", function(req, res) {
    // Grab every document in the Articles collection
    db.article.find({})
      .then(function(dbArticle) {
        // If we were able to successfully find Articles, send them back to the client
        res.json(dbArticle);
      })
      .catch(function(err) {
        // If an error occurred, send it to the client
        res.json(err);
      });
  });
  }