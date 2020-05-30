var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var ArticleSchema = new Schema({

    title: {
        type: String,
        required: true,
       
    },
    url:{
        type: String,
        required: true
        
    },
    paragraph:{
        type:String,
        required:false
        
        
    },
    saved:
    {
        type:Boolean,
        default:false,
        required:false
        
    },
    note:{
        type: [{type: Schema.Types.ObjectId, ref: 'Note'}],
       
    }
});

var article = mongoose.model("Article", ArticleSchema);

module.exports = article;