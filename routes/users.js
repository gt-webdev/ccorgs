'use strict';

var Users = require('../lib/hardcode').Users,
    util = require('util');

module.exports.viewUser = function(req, res) {
  if (!req.params["uid"]) {
    return res.send(404);
  }
  req.models.User.findOne(
    {
      '_id': req.models.User.ObjectID(req.params["uid"])
    },
    [],
    function(err, user) {
      if (err) {
        return res.send(404);
      }
      if (!user || !user.values) {
        return res.send(404);
      }
      if (req.ajaxify) {
        res.send(JSON.stringify({
          jsView: '/js/users/viewUser.js',
          pageData: {user: user.valuesFor(
            ['name', 'short', 'cover', 'emailHash', 'orgs']
          )}
        }));
      } else {
        res.render('index', {
          loadPage: true,
          jsView: '/js/users/viewUser.js',
          pageData: {user: user.valuesFor(
            ['name', 'short', 'cover', 'emailHash', 'orgs']
          )}
        });
      }
    }
  );
};

module.exports.viewSelf = function(req, res) {
  res.send(util.inspect(req.user));
};

module.exports.listUsers = function(req, res) {
  Users.getAll(function(err, users) {
    res.send(util.inspect(users));
  });
};

module.exports.updateUser = function(req, res, next) {
  var userid;
  if (req.params['uid']) {
    userid = req.params['uid'];
  } else if (req.user) {
    userid = req.user.id;
  } else {
    next(404);
  }
  Users.getById(userid, function(err, user) {
    if (err) {
      next(err);
    } else {
      Users.updateUser(user, function(err) {
        if (err) {
          return next(err);
        }
        next();
      });
    }
  });
};

/* module.exports.createUser
 *
 * you're probably reading this comment because you searched the file for the
 * handler function that creates a new user. This function doesn't exist 
 * because managing the creation of users is a responsibilities of the 
 * authentication library. createUser() exists in `lib/auth.js`
 */
