const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');

const User = require('../../DB/sequelize/models/User');


module.exports = () => {
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
