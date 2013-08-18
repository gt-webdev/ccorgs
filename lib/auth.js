'use strict';

var passport = require('passport'),
    util = require('util'),
    models = require('./models'),
    Remongo = require('remongo'),
    FacebookStrategy = require('passport-facebook').Strategy;

var remongo = new Remongo('ccorgs_db');
models.defineModels(remongo);

module.exports.requiresLogin = function(req, res, next) {
  if (req.isAuthenticated()) {return next(); }
  res.redirect('/login');
};

module.exports.requiresMod = function(req,res, next) {
  if (req.isAuthenticated() && req.user.values.admin === true) {
    next();
  } else if (req.isAuthenticated() && req.user.values.dekel === true) {
    next();
  } else if (req.isAuthenticated() && req.user.values._id &&
      req.params["vanity"]) {
    req.models.Org.findOne({vanity: req.params["vanity"]}, function(err, org) {
      var i;
      if (err || !org) {
        return next("404: Could not find the org which owns this page");
      }
      // check to see if the user is the admin for the org
      if (org.values.admin._id === req.user.values._id) {
        return next();
      }
      // check to see if the user is one of the moderators for the org
      for (i = 0; i < org.values.mods.length; i += 1) {
        if (org.values.mods[i]._id === req.user.values._id) {
          return next();
        }
      }
      next("401: FORBIDDEN. You must be a moderator for this org to view this" +
        "page");
    });
  } else {
    next("401: FORBIDDEN. You must be a moderator for this org to view this" +
        "page");
  }
};

module.exports.requiresAdmin = function(req, res, next) {
  if (req.isAuthenticated() && req.user.values.admin === true) {
    next();
  } else {
    next("401: FORBIDDEN. You must be a site admin to view this page");
  }
};

module.exports.requiresDekel = function(req, res, next) {
  if (req.isAuthenticated() && req.user.values.dekel === true) {
    next();
  } else {
    next("401: FORBIDDEN. You must be Dekel to view this page");
  }
};

passport.serializeUser(function(user, done) {
  console.log(user);
  done(null, user.values._id);
});

passport.deserializeUser(function(user_id, done) {
  remongo.models.User.findById(user_id, function(err, user) {
    if (err) {
      return done(err);
    } else if(!user) {
      return done("User not found in database");
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
      //console.log(accessToken, refreshToken, profile);
      console.log(parseInt(profile.id, 10));
      remongo.models.User.findOne({fbid: parseInt(profile.id, 10)}, [], function(err, user){
        if (err) {
          return done("user not found in db");
        }
        return done(null, user);
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
