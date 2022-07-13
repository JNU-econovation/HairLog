import passport from 'passport';
import local from './localStrategy.js';

import User from '../../DB/sequelize/models/User.js';

export default () => {

    local();
    
    passport.serializeUser((user, done) => {
      done(null, user.id);
    });
    
    passport.deserializeUser((id, done) => {
      User.findOne({
        where: { id },
        attributes : [ "id", "userName", "userCycle" ]
      })
      .then(user => done(null, user))
      .catch(err => done(err));
    });
};