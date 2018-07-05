const passport = require('koa-passport');
const config = require('config');
const {Strategy, ExtractJwt} = require('passport-jwt');
let User = require('../../models/user');
const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromHeader('authorization'),
  secretOrKey: config.get('jwtSecret')
};


passport.use(new Strategy(jwtOptions, function (payload, done) {
    User.findById(payload.id, (err, user) => {
      if (err) {
        return done(err)
      }
      if (user) {
        done(null, user)
      } else {
        done(null, false)
      }
    })
  })
);