const express = require('express');
const router = express.Router();

router.get('/', function (req, res, next) {
  res.render('homePage');
});

router.get('/admin', (req, res, next) => {
  res.render('admin');
});

module.exports = router;