import passport from 'passport';

import bcrypt from 'bcrypt';
op

import User from '../../../DB/sequelize/models/User.js';

// join by passport local
const join = async (req, res, next) => {
    const { userEmail, userPassword, userName, userSex, userCycle } = req.body;
    try {
      const exUser = await User.findOne({ where: { userEmail } });
      if (exUser) {
        return res.redirect('/existUser');
      }
      const hash = await bcrypt.hash(userPassword, 12);
      let user = await User.create({
        userEmail,
        userPassword : hash,
        userName,
        userSex,
        userCycle,
      });
      return res.send({code : 200, msg : user});
    } catch (error) {
      console.error(error);
      return next(error);
    }
  }

// login by passport local
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
        return res.send({code : 200, msg : user})
      });
    })(req, res, next);
};

// check isLoggedIn by passport local
const isLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) {
      next();
  } else {
    return res.redirect("/before_login")
  }
};

// check isNotLoggedIn by passport local
const isNotLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated()) {
      next();
  } else {
      const message = encodeURIComponent('로그인한 상태입니다.');
      res.redirect('/');
  }
};

// check password
const checkPassword = async (req, res, next) => {
  const { userPassword } = req.body;
  let dbUser = await findOne({where : {id : req.user.id}})
  const check = await bcrypt.compare(userPassword, dbUser.userPassword);

  if(check) {
    return res.send({code : 200})
  }
  return res.send({code : 404})
}

export default { join , authenticate, isLoggedIn, isNotLoggedIn, checkPassword}
