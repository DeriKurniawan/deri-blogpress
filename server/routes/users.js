var express = require('express');
var router = express.Router();
var user = require('../controller/user');
var passport = require('passport');

/* GET users listing. */
router.get('/', user.read);
router.post('/signup', user.signup);
router.post('/signin', passport.authenticate('local', {session:false}), user.signin);

module.exports = router;
