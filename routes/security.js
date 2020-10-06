var express = require('express');
var security = require('../domain/security/security');
var auth = require('../domain/authentication/authentication');

var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('login');
});

router.post('/', function(req, res, next){
  security.logon(req.body.user, req.body.password)
    .then(function(id){
      if(id) {
        const token = auth.authenticate(id);
        res.json({auth: true, token: token});
      }
    })
    .catch(function() {
      res.status(401).json('Invalid Login information');
    });
})

router.post('/logout', function(req, res, next) {
  res.json({auth: false, token: null});
})

module.exports = router;