var axios = require("axios");
var cheerio = require("cheerio");
var db = require("../models");


  // Load index page
  module.exports = function(app){
  
  app.get("/all", function(req,res){
    axios.get("https://news.yahoo.com/").then(function(response){
        var $ = cheerio.load(response.data);
           
        $("div").each(function(i,element){
            let count = i;
            var result = {};
        
        
            result.title= $(element)
            .children("h3")
            .text()
            result.url = $(element)
            .children("h3")
            .children("a")
            .attr("href")
            result.paragraph = $(element)
            .children("p")
            .text()
            
            if(result.title && result.url && result.paragraph){
            db.article.create(result)
            .then(function(dbArticle){
                console.log(dbArticle);
                count++;
            })
            .catch(function(err){
                res.json(err);
            });
          };
        });
        res.redirect("/");
    });
   
});

// route for displying all articles
app.get("/", function(req, res) {
    // Grab every document in the Articles collection
    db.article.find({})
      .then(function(dbArticle) {
       
        var handlebarsObject = {
          scrape:  dbArticle.map(function(article){
          
            return {
              _id:article.id,
              title:article.title,
              url:"https://news.yahoo.com" + article.url,
              paragraph:article.paragraph,
              saved:article.saved
            }
            
          })  
        }    
          res.render("index", handlebarsObject);  
          
      })
      .catch(function(err) {
        // If an error occurred, send it to the client
        res.json(err)
      });
  });

  app.get("/saved", function(req, res) {
    db.article.find({saved:true})
    .then(function(dbArticle){
      var handlebarsObject = {
        scrape:  dbArticle.map(function(article){
        
          return {
            _id:article.id,
            title:article.title,
            url:"https://news.yahoo.com"+article.url,
            paragraph:article.paragraph,
            saved:article.saved

          }
          
        })  
      }
      res.render("saved" , handlebarsObject);
    })
    .catch(function(err){
      res.json(err)
    });
   
  });

  // route for grabbing all the articles from the db


  app.get("/articles", function(req,res){
    
    db.article.find({}).
    then(function(dbArticle){
      for (var i =0;i <20;i++){
      res.json(dbArticle)
      }
    })
    .catch(function(err){
      res.json(err)
    });
  });

  // route for saving an article

  app.put("/save/:id",function(req,res){
    db.article.findOneAndUpdate({_id: req.params.id},{saved:true})
    .then(function(data){
      res.json(data)
    })
    .catch(function(err){
      res.json(err)
    });
  })
  app.put("/remove/:id", function(req,res){
    db.article.findOneAndUpdate({_id:req.params.id},{saved:false})
    .then(function(data){
      res.json(data)
    })
    .catch(function(err){
      res.json(err)
    })
  })

  ///route for grabbing a specific article by id
app.get("/articles/:id" , function (req,res){
  db.article.findOne({_id: req.params.id})
  .populate("note")
  .then(function(dbArticle){
    res.json(dbArticle)
  })
  .catch(function(err){
    res.json(err)
  });
});

app.post("/note/:id", function(req,res){
  db.Note.create(req.body)
  .then(function(dbNote){
    return db.article.findOneAndUpdate({_id:req.params.id},{$push:{note: dbNote._id}},{new:true})
  })
  .then(function(dbArticle){
    res.json(dbArticle)
  })
  .catch(function(err){
    res.json(err)
  })
})
app.delete("/note/:id", function(req,res){
  db.Note.findByIdAndRemove({_id:req.params.id})
  .then(function(dbNote){
    return db.article.findOneAndUpdate({note:req.params.id},{$pullAll:[{note: req.params.id}]})
  })
  .then(function(dbArticle){
    res.json(dbArticle)
  })
  .catch(function (err){
    res.json(err)
  })
})

  }