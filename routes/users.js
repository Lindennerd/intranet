var express = require('express');
var router = express.Router();
var auth = require('../domain/authentication');
var usersDomain = require('../domain/users');

router.get('/', auth.authorize, auth.isAdmin, async function(req, res, next) {
  const users = await usersDomain.listUsers();
  res.render('users', { title: 'Gerenciamento de Usuários', users: users });
});

router.get('/delete/:useremail', auth.authorize, auth.isAdmin, async function(req, res, next) {
  const email = req.params.useremail;
  const response = usersDomain.deleteUser(email);

  if(response === 'success') res.redirect('/users'); 
  else {
    res.locals.error = 'Erro na deleção de usuários';
    res.redirect('/users');
  }
});

router.get('/changeadmin/:useremail', auth.authorize, auth.isAdmin, async function(req, res, next) {
  const email = req.params.useremail;
  const response = usersDomain.changeAdmin(email);

  if(response === 'success') res.redirect('/users');
  else {
    res.locals.error = 'Erro na edição de usuários';
    res.redirect('/users');
  }
});

router.post('/add', auth.authorize, auth.isAdmin, async function(req, res, next) {
  const user = req.body;
  console.log(user);

  const response = await usersDomain.addUser(user);

  if(response === 'success') res.redirect('/users');
  else {
    res.locals.error = 'Erro na criação de usuários';
    res.redirect('/users');
  }
});

module.exports = router;
