var express = require('express');
var router = express.Router();
const mysql  = require('mysql'); //require the mysql package

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Landing Page' });
});


module.exports = router;


