const passport = require('passport');
const bcrypt = require('bcrypt');


const User = require('../../../DB/sequelize/models/User');


const join = async (req, res, next) => {
    const { userEmail, userPassword, userName, userSex, userCycle } = req.body;
    try {
      const exUser = await User.findOne({ where: { userEmail } });
      if (exUser) {
        return res.redirect('/existUser');
      }
      const hash = await bcrypt.hash(userPassword, 12);
      await User.create({
        userEmail,
        userPassword : hash,
        userName,
        userSex,
        userCycle,
      });
      return res.send({code : 200, msg : "Join Success"});
    } catch (error) {
      console.error(error);
      return next(error);
    }
  }

const authenticate = (req, res, next) => {
    passport.authenticate('local', (authError, user) => {
      if (authError) {
        console.error(authError);
        return next(authError);
      };
      if (!user) {
        ;
        return res.send({code : 404, msg :'NO EXISTING USER'});
      };
      return req.login(user, (loginError) => {
        if (loginError) {
          console.error(loginError);
          return next(loginError);
        };
        ;
        return res.send({code : 202, msg : "Login Success"})
      });
    })(req, res, next);
};

const isLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) {
      next();
  } else {
      res.send({code : 404 , msg : '로그인 필요'});
  }
};

const isNotLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated()) {
      next();
  } else {
      const message = encodeURIComponent('로그인한 상태입니다.');
      res.redirect('/mainPage');
  }
};

module.exports = { join , authenticate, isLoggedIn, isNotLoggedIn}
