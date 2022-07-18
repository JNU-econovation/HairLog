import passport from 'passport';
import { hash as _hash, compare } from 'bcrypt';


import User from '../../../DB/sequelize/models/User.js';


const join = async (req, res, next) => {
    const { userEmail, userPassword, userName, userSex, userCycle } = req.body;
    try {
      const exUser = await User.findOne({ where: { userEmail } });
      if (exUser) {
        return res.redirect('/existUser');
      }
      const hash = await _hash(userPassword, 12);
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

const isLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) {
      next();
  } else {
    return res.redirect("/before_login")
  }
};

const isNotLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated()) {
      next();
  } else {
      const message = encodeURIComponent('로그인한 상태입니다.');
      res.redirect('/');
  }
};

const checkPassword = async (req, res, next) => {
  const { userPassword } = req.body;
  let dbUser = await findOne({where : {id : req.user.id}})
  console.log(userPassword)
  console.log(dbUser.userPassword)
  const check = await compare(userPassword, dbUser.userPassword);
  if(check) {
    return res.send({code : 200})
  }
  return res.send({code : 404})
}

export default { join , authenticate, isLoggedIn, isNotLoggedIn, checkPassword}
