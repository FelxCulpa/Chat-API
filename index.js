const Koa = require('koa');
const config = require('config');
const bodyParser = require('koa-bodyparser');
const mongoose = require('./libs/mongoose');
const passport = require('./libs/passport');
const {routes} = require ('./routes/routes');

const app = new Koa();
app.use(async function(ctx, next) {

  try {
    await next();
  } catch (e) {
    if (e.status) {
      ctx.body = e.message;
      ctx.status = e.status;
    } else {
      ctx.body = "Error 500";
      ctx.status = 500;
      console.error(e.message, e.stack);
    }

  }
});
app.use(bodyParser());
app.use(passport.initialize());
app.use(routes());
app.listen(config.get('serverPort'));

