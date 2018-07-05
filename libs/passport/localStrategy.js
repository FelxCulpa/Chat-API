let passport = require('koa-passport');
let LocalStrategy = require('passport-local');
let User = require('../../models/user');

// Стратегия берёт поля из req.body
// Вызывает для них функцию
passport.use(new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password',
    session: false
  },
  function (username, password, done) {
    User.findOne({username}, (err, user) => {
      if (err) {
        return done(err);
      }
      
      if (!user || !user.checkPassword(password)) {
        return done(null, false, {message: 'Wrong username or password'});
      }
      return done(null, user);
    });
  }
  )
);