const User = require('../models/user');
const passowrdhash = require('password-hash');
const jwt = require('jsonwebtoken');
const helper = require('../helper/cronjob');

var models = {}

models.signup = function(req, res, next){
  req.body.password = passowrdhash.generate(req.body.password);
  User.create(req.body, (err, user)=>{
    if (err) {
      res.send({
        result: err,
        msg: 'Username and email must unique'
      })
    } else {
      helper.createCronJob(user);
      res.send({
        result: user,
        msg: 'creating new user is success!'
      })
    }
  })
}

models.signin = function(req, res, next){
  console.log('signin : ----', req.user);
  let user = req.user
  var token = jwt.sign({
    _id: user._id,
    name: user.name,
    username: user.username
  }, 'rahasia', { expresIn: '1h' })
  let sendUser = {
    _id: user._id,
    name: user.name,
    username: user.username,
    token: token
  }
  res.send(sendUser)
}

models.read = function(req, res){
  User.find({}, (err, result)=>{
    if (err) {
      res.send(err)
    } else {
      res.send(result)
    }
  })
}

module.exports = models;
