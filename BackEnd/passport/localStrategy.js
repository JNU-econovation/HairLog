import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import bcrypt from 'bcrypt';

import User from '../../DB/sequelize/models/User.js';

// config local strategy
export default () => {
  passport.use(new LocalStrategy(
  {
    usernameField: 'userEmail',
    passwordField: 'userPassword',
  }, 
  async (userEmail, userPassword, done) => {
    try {
      const exUser = await User.findOne({ where: { userEmail : userEmail } });
      if (exUser) {
        const result = await bcrypt.compare(userPassword, exUser.userPassword);
        if (result) {
          done(null, exUser);
        } else {
          done(null, false, { message: '비밀번호가 일치하지 않습니다.' });
        };
      } else {
        done(null, false, { message: '가입되지 않은 회원입니다.' });
      };
    } catch (error) {
      console.error(error);
      done(error);
    }
  }
  ));
};
