const express = require('express');
const router = express.Router();

router.get('/', function(req, res, next) {
  res.render('home');
});

router.get('/before_login', function(req, res, next) {
  res.render('before_login');
});

router.get('/record', function(req, res, next) {
  res.render('record');
});

module.exports = router;
