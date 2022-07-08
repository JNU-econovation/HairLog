const express = require('express');
const router = express.Router();

const passport = require('../middlewares/passport');


router.get('/', passport.isLoggedIn, function(req, res, next) {
  res.render('home');
});

router.get('/before_login', function(req, res, next) {
  res.render('before_login');
});

router.get('/after_register', passport.isLoggedIn, function(req, res, next) {
  res.render('after_register');
});

router.get('/record', passport.isLoggedIn, function(req, res, next) {
  res.render('record');
});

router.get('/register_1', passport.isLoggedIn, function(req, res, next) {
  res.render('register_1');
});

router.get('/register_2', passport.isLoggedIn, function(req, res, next) {
  res.render('register_2');
});

module.exports = router;
