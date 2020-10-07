var express = require('express');
var router = express.Router();
var auth = require('../domain/authentication/authentication');
var usersDomain = require('../domain/users/users');

/* GET home page. */
router.get('/', auth.authorize, function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
