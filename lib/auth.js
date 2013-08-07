'use strict';

var passport = require('passport'),
    Users = require('./hardcode').Users,
    util = require('util'),
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

var createUserFromService = function(service, profile, cb) {
  console.log("attempting to create new user from:", service, "with profile:",
      util.inspect(profile));
  cb(null, profile);
};
/*
var authService = function(user, service, cb) {
  console.log("attempting to add service:", service, "to existing user:",
      util.inspect(user));
  cb(null);
};*/

var deauthService = function(user, service, cb) {
  console.log("attempting to remove service:", service, "from existing user:",
      util.inspect(user));
  cb(null);
};

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
          createUserFromService('facebook', profile, function(err, user) {
            return done(null, "attempting to create a new user from fb-auth");
          });
        } else {
          return done(null, user);
        }
      });
    });
  }
));

var renLoginPage = function(req, res) {
  res.send('login page');
};

module.exports.setUp = function(app) {
  app.use(passport.initialize());
  app.use(passport.session());

  app.get('/login', renLoginPage);
  app.get('/auth/login', renLoginPage);
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
  app["delete"](
    "/auth/facebook",
    module.exports.requiresLogin,
    function(req, res) {
      deauthService(req.user, 'facebook', function(err) {
        if (err) {
          return res.send(err);
        }
        res.send("successfully deauthorized facebook");
      });
    }
  );
};
