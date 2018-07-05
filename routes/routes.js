const Router = require('koa-router');
const passport = require('koa-passport');
const jwt = require('jwt-simple');

const Post = require('../models/post');
const User = require('../models/user');
const config = require('config');

const router = new Router();

router.post('/user', async(ctx, next) => {
	
		user = new User (ctx.request.body);
    	
	  	try {
			  await user.save();
			} catch(e) {
				 if (e.name == 'ValidationError') {
			      let errorMessages = "";
			      for(let key in e.errors) {
			        errorMessages += `${e.errors[key].message}`;
			      }
			      ctx.body = errorMessages;
			      return;
			    } else {
		     	  ctx.throw(e);
	    		}
			}
		 ctx.body = "User created";

  
});
 
router.post('/login', async(ctx, next) => {
  await passport.authenticate('local', { session: false }) (ctx, next);
 
  if (ctx.state.user) {
    const payload = {
      id: ctx.state.user._id,
      displayName: ctx.state.user.username
    };

    const token = jwt.encode(payload, config.jwtSecret);
    ctx.body = {user: ctx.state.user.username, token: token};;

  } else {
    ctx.status = 400;
    ctx.body = {error: "Invalid credentials"};
  }  
});

router.get('/posts', async function (ctx, next) {
	 await passport.authenticate('jwt', {session: false})(ctx, next);

  if (!ctx.state.user) {
    ctx.status = 400;
    ctx.body = {error: 'invalid credentials'};
    return;
  }
    
    ctx.body = await Post.find().select('-_id -__v');
});
router.post('/posts', async (ctx, next) => {
	 await passport.authenticate('jwt', {session: false})(ctx, next);

  if (!ctx.state.user) {
    ctx.status = 400;
    ctx.body = {error: 'invalid credentials'};
    return;
  }
  	ctx.request.body.username = ctx.state.user.username;
	let post = new Post(ctx.request.body);
	try {
		 await post.save();
		} catch(e) {
			 if (e.name == 'ValidationError') {
		      let errorMessages = "";
		      for(let key in e.errors) {
		        errorMessages += `${e.errors[key].message}`;
		      }
		      ctx.body = errorMessages;
		      return;
		    } else {
	     	  ctx.throw(e);
    		}
		}
	ctx.body = 'Post added to database';
})

module.exports.routes = () => router.routes()