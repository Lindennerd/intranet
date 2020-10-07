var express = require('express');
var security = require('../domain/security');
var auth = require('../domain/authentication');

var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('login', {title: "Login", layout: 'login-layout'});
});

router.post('/', function(req, res, next) {
  security.logon(req.body.useremail, req.body.password)
    .then(function(id){
      if(id) {
        req.session.user = id;
        res.redirect("/");
      }
    })
    .catch(function() {
      res.render('login', {
        title: "Login", 
        error: "Verifique as informações de login", 
        layout: 'login-layout'});
    });
})

router.get('/logout', function(req, res, next) {
  req.session.reset();
  res.redirect('/security');
})

module.exports = router;
