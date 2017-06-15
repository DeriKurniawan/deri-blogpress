var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var cors = require('cors');
var mongoose = require('mongoose');
var passport = require('passport');
var passwordHash = require('password-hash');
var Strategy = require('passport-local').Strategy;

var mongooseConnect = 'mongodb://localhost:27017/nama_db';
mongoose.connect(mongooseConnect, (err, res)=>{
  console.log('connected to DB : '+mongooseConnect);
})

var index = require('./routes/article');
var users = require('./routes/users');

var app = express();
passport.use(new Strategy(
  function (username, password, next){
    let User = require('./modals/user');
    User.findOne({username: username}, (err, user)=>{
      //console.log(user);
      if (err) {
        next(err)
      }
      if (passwordHash.verify(password, user.password)) {
        next(null, user);
      } else {
        next('username or password is wrong, or please sign up');
      }
    })
  }
))


// view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(cors());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api', index);
app.use('/user', users);

// catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   var err = new Error('Not Found');
//   err.status = 404;
//   next(err);
// });
//
// // error handler
// app.use(function(err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};
//
//   // render the error page
//   res.status(err.status || 500);
//   res.render('error');
//});

module.exports = app;
