const Article = require('../models/article');
var models = {}

models.index = function(req, res){
  Article.find({}, (err, articles)=>{
    if (err) {
      res.send(err)
    } else {
      res.send(articles)
    }
  })
}

models.showOne = function(req, res){
  Article.findById(req.params.id)
  .populate('author')
  .exec((err, article)=>{
    if (err) {
      res.send(err)
    } else {
      res.send(article);
    }
  })
}

models.create = function(req, res){
  let user = req.decoded;
  console.log('user: ----------', user);
  var newArticle = new Article({
    title: req.body.title,
    content: req.body.content,
    category: req.body.category,
    author: user._id
  })
  console.log('article on create: -------', newArticle);
  newArticle.save((err, article)=>{
    if (err) {
      res.send(err)
    } else {
      Article.findById(article._id)
      .populate('author')
      .exec((err, result)=>{
        if (err) {
          res.send(err)
        } else {
          res.send(result)
        }
      })
    }
  })
}

models.update = function(req, res){
  let user = req.decoded;
  Article.findById(req.params.id, (err, article)=>{
    if (err) {
      res.send(err)
    } else {
      if(article.author == user._id){
        article.title = req.body.title || article.title;
        article.content = req.body.content || article.content;
        article.category = req.body.category || article.category;

        article.save((err, data)=>{
          if (err) {
            res.send(err)
          } else {
            res.send({
              result: data,
              msg: 'article is edited!'
            })
          }
        })
      } else {
        res.send({msg: 'You cannot edit this article!, not authorized user!'})
      }
    }
  })
}

models.delete = function(req, res){
  let user = req.decoded;
  Article.findById(req.params.id, (err, article)=>{
    if (err) {
      res.send(err)
    } else {
      if (article.author == user._id) {
        Article.findByIdAndRemove(article._id, (err, data)=>{
          if (err) {
            res.send(err)
          } else {
            res.send({
              result: data,
              msg: 'article is deleted'
            })
          }
        })
      } else {
        res.send({
          msg:'You cannot delete this article, not authorized user'
        })
      }
    }
  })
}

module.exports = models;
