'use strict';

var passport = require('passport'),
    Users = require('./hardcode').Users,
    FacebookStrategy = require('passport-facebook').Strategy;

module.exports.requiresLogin = function(req, res, next) {
  if (req.isAuthenticated()) {return next(); }
  res.redirect('/login');
};

module.exports.requiresMod = function(req,res, next) {
  if (req.isAuthenticated() && req.user.admin === true) {
    next();
  } else {
    next("401: FORBIDDEN. You must be a moderator for this org to view this" +
        "page");
  }
};

module.exports.requiresAdmin = function(req, res, next) {
  if (req.isAuthenticated() && req.user.admin === true) {
    next();
  } else {
    next("401: FORBIDDEN. You must be a site admin to view this page");
  }
};

module.exports.requiresDekel = function(req, res, next) {
  if (req.isAuthenticated() && req.user.dekel === true) {
    next();
  } else {
    next("401: FORBIDDEN. You must be Dekel to view this page");
  }
};

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(obj, done) {
  Users.getById(obj, function(err, user){
    if (err) {
      return done(err.msg);
    }
    done(null, user);
  });
});

passport.use(new FacebookStrategy({
    clientID: process.env.FACEBOOK_ID,
    clientSecret: process.env.FACEBOOK_SECRET,
    callbackURL: "http://local.foo.com:5000/auth/facebook/callback"
  },
  function(accessToken, refreshToken, profile, done) {
    process.nextTick(function() {
      console.log(accessToken, refreshToken, profile);
      Users.getByFBId(profile.id, function(err, user){
        if (err) {
          return done(err.msg);
        }
        return done(null, user);
      });
    });
  }
));

var renLoginPage = function(req, res) {
  res.send('login page');
};

var submitLoginReq = function(req, res) {
  console.log(req.params);
  console.log(req.body);
  console.log('login requested');
  res.redirect('/');
};

module.exports.setUp = function(app) {
  app.use(passport.initialize());
  app.use(passport.session());

  app.get('/login', renLoginPage);
  app.get('/auth/login', renLoginPage);
  app.post('/auth/login', submitLoginReq);
  app.get('/auth/facebook',
    passport.authenticate('facebook'),
    function(req, res) {
    }
  );
  app.get('/auth/facebook/callback',
    passport.authenticate('facebook', {failureRedirect: '/login' }),
    function(req, res) {
      res.redirect('/');
    }
  );
};
