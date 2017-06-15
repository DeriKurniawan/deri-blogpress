var express = require('express');
var router = express.Router();
var article = require('../controller/article');
var jwt = require('../helper/jwt');

/* GET home page. */
router.get('/', article.index);
router.get('/:id', article.showOne);
router.post('/', jwt.verifyUser, article.create);
router.put('/:id', jwt.verifyUser, article.update);
router.delete('/:id', jwt.verifyUser, article.delete);

module.exports = router;
