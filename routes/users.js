var express = require('express');
var router = express.Router();
var User = require('../models/user');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('User authenticated');
});

router.post('/login', function(req, res, next) {
  let username = req.body.username;
  let password = req.body.password;

  if(username === 'teste@fermento.com' && password === '123456'){
    res.status(200).send(new User('teste@fermento.com', 'Luiz', '', 'student'));
  }else{
    res.status(400).send('User not found or password not match');

  }
});

router.post ('/create',function(req, res, next) {
  let newUser = new User(req.body.user.username, req.body.user.name, req.body.user.password, req.body.user.type);
  //save User on Database
  res.status(200).send(newUser);
});


module.exports = router;
