'use strict';

var passport = require('passport'),
    md5 = require('MD5'),
    util = require('util'),
    models = require('./models'),
    Remongo = require('remongo'),
    GitHubStrategy = require('passport-github').Strategy,
    GoogleStrategy = require('passport-google-oauth').OAuth2Strategy,
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

passport.use(new GitHubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: "http://local.foo.com:5000/auth/github/callback"
  },
  function(accessToken, refreshToken, profile, done) {
    // asynchronous verification, for effect...
    process.nextTick(function () {
      remongo.models.User.findOne({ghid: parseInt(profile.id, 10)}, [], function(err, user){
        if (err) {
          //user doesn't yet exist, create a dummy user and proceed to finish registration
          var userData = {
            name: profile._json.name,
            username: profile.id,
            short: "",
            cover: "#007fff",
            emailHash: md5(profile._json.email),
            fbid: parseInt(profile.id, 10),
            dekel: false,
            admin: false,
            email: profile._json.email,
            additemails: []
          };

          var partialUser = new remongo.models.User(userData);
          partialUser.save(function(err, dbUser) {
            return done(err, dbUser);
          });
        } else {
          return done(null, user);
        }
      });
    });
  }
));

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://local.foo.com:5000/auth/google/callback"
  },
  function(token, tokenSecret, profile, done) {
    process.nextTick(function() {
      remongo.models.User.findOne({gglid: parseInt(profile.id, 10)}, [], function(err, user){
        if (err) {
          //user doesn't yet exist, create a dummy user and proceed to finish registration
          var userData = {
            name: profile._json.name,
            username: profile.id,
            short: "",
            cover: "#007fff",
            emailHash: md5(profile._json.email),
            gglid: parseInt(profile.id, 10),
            dekel: false,
            admin: false,
            email: profile._json.email,
            additemails: []
          };

          var partialUser = new remongo.models.User(userData);
          partialUser.save(function(err, dbUser) {
            return done(err, dbUser);
          });
        } else {
          return done(null, user);
        }
      });
    });
    /*User.findOrCreate({ googleId: profile.id }, function (err, user) {
      return done(err, user);
    });*/
  }
));
passport.use(new FacebookStrategy({
    clientID: process.env.FACEBOOK_ID,
    clientSecret: process.env.FACEBOOK_SECRET,
    callbackURL: "http://local.foo.com:5000/auth/facebook/callback"
  },
  function(accessToken, refreshToken, profile, done) {
    process.nextTick(function() {
      remongo.models.User.findOne({fbid: parseInt(profile.id, 10)}, [], function(err, user){
        if (err) {
          //user doesn't yet exist, create a dummy user and proceed to finish registration
          var userData = {
            name: profile.displayName,
            username: profile.id,
            short: "",
            cover: "#007fff",
            emailHash: md5(profile._json.email),
            fbid: parseInt(profile.id, 10),
            dekel: false,
            admin: false,
            email: profile._json.email,
            additemails: []
          };

          var partialUser = new remongo.models.User(userData);
          partialUser.save(function(err, dbUser) {
            return done(err, dbUser);
          });
        } else {
          return done(null, user);
        }
      });
    });
  }
));

var renLoginPage = function(req, res) {
  res.render("js/views/auth/login", {xhr: req.xhr});
};

var finishAuthentication = function(req, res) {
  if (req.user.values.gtid) {
    res.redirect('/');
  } else {
    //new user, try to merge if possible.
    res.redirect('/auth/gtid');
    
  }
};

var resolveMerge = function(req, res) {
  // TODO: Don't Forget to do the following
  // 0. ensure there is a logged-in partial user
  // 1. confirm that the logged in user is allowed to execute the merge
  // 2. read which items need to be kept
  // 3. execute the merge
  // 4. move the user-to-be-deleted to the backup collection
  // 5. profit
  if (req.isAuthenticated()) {
    console.log(req.body.req_user_id, req.user.values._id);
    if (req.body.req_user_id == req.user.values._id.toString()) { 
      remongo.models.User.customSearch({_id: new remongo.ObjectID(req.body.merge_user_id), $or:[
          {email: req.user.values.email},
          {additemails: req.user.values.email}
        ]},
        [],
        function(err, usersToMerge) {
          var newEmailsArray = [], i, testemail, newName = req.body.finalname, 
          userToMerge, updateValues;
          if (err || !usersToMerge || usersToMerge.length !== 1) {
            return res.send(500);
          } else {
            userToMerge = usersToMerge[0];
            var newAuthField = (req.user.values.fbid? "fbid": 
              (req.user.values.gglid? "gglid": "ghid"));
            //set the user-in-db's display name and merge 
            //additionalemails array
            for (i = 0; i < userToMerge.values.additemails.length; i++) {
              testemail = userToMerge.values.additemails[i];
              if (newEmailsArray.indexOf(testemail) === -1) {
                newEmailsArray.push(testemail);
              }
            }
            if (newEmailsArray.indexOf(req.user.values.email) === -1 &&
              userToMerge.values.email !== req.user.values.email) {
              newEmailsArray.push(req.user.values.email);
            }
            if (req.user.values.name !== newName && 
              userToMerge.values.name !== newName) {
              newName = req.user.values.name;
            }
            updateValues = {
              name: newName,
              additemails: newEmailsArray
            };
            updateValues[newAuthField] = req.user.values[newAuthField];
            userToMerge.update(updateValues, function(err, updatedObject) {
              if (err) { return res.send(500); }
              req.user.remove(function() {});
              req.login(updatedObject, function(err) {
                if (err) { res.send(400); }
                return res.redirect('/orgs');
              });
            });
          }
        }
      ); 
    } else {
      return res.send(403);
    }
  } else {
    return res.redirect(303, '/login');
  }
};

var requestGtid = function(req, res) {
  remongo.models.User.customSearch({$or:[
     {email: req.user.values.email},
     {additemails: req.user.values.email}
   ]},
   [],
   function(err, userToMerge) {
     if (err || !userToMerge || userToMerge.length === 0) {
       return res.render('js/views/auth/requestgtid', {
         xhr: req.xhr,
         props: {
          user: req.user.values
         }
       });
     } else {
       //merge github uid into current user
       res.render('js/views/auth/requestmerge', {
         xhr: req.xhr,
         props: {
           user: req.user.values,
           userToMerge: userToMerge[0].values
         }
       });
     }
   });
};

var saveGtid = function(req, res) {
  req.user.update({gtid: parseInt(req.body.gtid, 10)}, function(err, updatedUser) {
    req.user.save()
    res.redirect('/');
  }); 
};

module.exports.setUp = function(app) {
  app.use(passport.initialize());
  app.use(passport.session());

  app.get('/login', renLoginPage);
  app.get('/auth/gtid', module.exports.requiresLogin, requestGtid);
  app.put('/auth/gtid', module.exports.requiresLogin, saveGtid);
  app.get('/auth/login', renLoginPage);
  app.put('/auth/merge', /* do not need requiresLogin */ resolveMerge)
  //github
  app.get('/auth/github',
    passport.authenticate('github', {scope: ['user:email']}));

  app.get('/auth/github/callback', 
    passport.authenticate('github', { failureRedirect: '/login' }),
    finishAuthentication
  );
  //Google
  app.get('/auth/google',
    passport.authenticate('google',{ scope: ['https://www.googleapis.com/auth/userinfo.profile',
                                            'https://www.googleapis.com/auth/userinfo.email'] }));

  app.get('/auth/google/callback', 
    passport.authenticate('google', { failureRedirect: '/login' }),
    finishAuthentication
  );
  //Facebook
  app.get('/auth/facebook',
    passport.authenticate('facebook', {scope: ['email']}),
    function(req, res) {
    }
  );
  app.get('/auth/facebook/callback',
    passport.authenticate('facebook', {failureRedirect: '/login' }),
    finishAuthentication
  );
  app.delete(
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
  app.get('/auth/logout', function(req, res){
    req.logout();
    res.redirect('/');
  });
};
