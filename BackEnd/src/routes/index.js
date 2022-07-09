const express = require('express');
const router = express.Router();

const passport = require('../middlewares/passport');


router.get('/', passport.isLoggedIn, function(req, res, next) {
  res.render('home');
});

router.get('/before_login', function(req, res, next) {
  res.render('before_login');
});

router.get('/record', passport.isLoggedIn, function(req, res, next) {
  res.render('record');
});

module.exports = router;
