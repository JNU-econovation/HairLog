var passport = require('passport'),
    JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;

const User = require('../../DB/sequelize/models/User');

var opts = {};
// opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.jwtFromRequest = ExtractJwt.fromHeader('authorization');
opts.secretOrKey = process.env.JWT_SECRET;
opts.issuer = process.env.JWT_ISSUER;

module.exports = () => {
    passport.use("jwt", new JwtStrategy(opts, async function(jwt_payload, done) {
        const exUser = await User.findOne({ where : { id : jwt_payload.id }});
        if(exUser){
            done(null, exUser);
        } else {
            done(null, false);
        };
    }));
};