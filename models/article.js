var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var ArticleSchema = new Schema({

    title: {
        type: String,
        required: true
    },
    url:{
        type: String,
        required: true
    },
    paragraph:{
        type:String
        
    }
});

var article = mongoose.model("Article", ArticleSchema);

module.exports = article;