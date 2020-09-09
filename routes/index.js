var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/user', (req, res, next) => {
  res.send('User Page');
});

router.get('/admin', (req, res, next) => {
  res.render('admin');
});

module.exports = router;
