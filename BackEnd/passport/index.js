const passport = require('passport'),
    local = require('./localStrategy');

const User = require('../../DB/sequelize/models/User');

module.exports = () => {

    local();
    
    passport.serializeUser((user, done) => {
      done(null, user.id);
    });
    
    passport.deserializeUser((id, done) => {
      User.findOne({
        where: { id },
        attributes : [ "id" ]
      })
      .then(user => done(null, user))
      .catch(err => done(err));
    });
};