const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var ArticleSchema = new Schema({
  title: {type:String, required:true},
  content: {type:String, required:true},
  category: {type:String, reqired:true},
  author: {type: Schema.Types.ObjectId, ref:'User'}
});

var Article = mongoose.model('Article', ArticleSchema);

module.exports = Article;
