var express = require('express');
var router = express.Router();
var User = require('../models/user');
const db = require("../data/database.js");
const md5 = require('md5');

/* GET users listing. */
router.get('/', function(req, res, next) {
  let sql = "select * from user"
  let params = []
  db.all(sql, params, (err, rows) => {
    if (err) {
      res.status(400).json({"error":err.message});
      return;
    }
    res.json({
      "message":"success",
      "data":rows
    })
  });
});

router.post('/login', function(req, res, next) {
  let username = req.body.username;
  let password = req.body.password;

  let sql = "select * from user where userName = ? and password = ?"
  let params = [username, md5(password)]
  db.get(sql, params, (err, row) => {
    if (err || row === undefined) {
      res.status(400).json({"error":"User not found or login incorrect"}).send();
    }else {
      res.json({
        "message": "success",
        "data": new User(row['username'], row['name'], '', row['type'])
      })
    }
  });
});

router.post ('/create',function(req, res, next) {
  let newUser = new User(req.body.username, req.body.name, md5(req.body.password), req.body.type).getInstance();
  let sql ='INSERT INTO user (userId, username, name, password, type, dataCreated) VALUES ($userId,$username,$name,$password,$type,$dataCreated)'
  let params ={
    $userId : newUser.userId,$username : newUser.username ,$name : newUser.name,$password : newUser.password,$type : newUser.type,$dataCreated : newUser.dataCreated }
  console.log(params);
  db.run(sql, params, function (err, result) {
    if (err){
      res.status(400).json({"error": err.message})
      return;
    }
    res.json({
      "message": "success",
      "data": newUser,
      "id" : this.lastID
    })
  });
});


module.exports = router;
