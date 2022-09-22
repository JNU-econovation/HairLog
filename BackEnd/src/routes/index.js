import { Router } from 'express';
const router = Router();

import passport from '../middlewares/passport.js';

router.get('/after_register', passport.isLoggedIn, function(req, res, next) {
  res.render('after_register');
});

router.get('/before_login', function(req, res, next) {
  res.render('before_login');
});

router.get("/designer", passport.isLoggedIn, function(req, res, next) {
  res.render('designer');
});

router.get("/editProfile", passport.isLoggedIn, function(req, res, next) {
  res.render('editProfile');
});

router.get('/', passport.isLoggedIn, function(req, res, next) {
  res.render('home');
});

router.get("/mypage", passport.isLoggedIn, function(req, res, next) {
  res.render('mypage');
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

export default router;
