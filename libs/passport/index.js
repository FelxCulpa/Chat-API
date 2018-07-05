const passport = require('koa-passport');
const User = require('../../models/user');

require('./localStrategy');
require('./JWTStrategy');

module.exports = passport;
