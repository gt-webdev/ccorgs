'use strict';

var Users = require('../lib/hardcode').Users,
    util = require('util');


//section: REDIRECTS

/* GET /users/profile
 * sends the user to his own profile page */
exports.viewSelf = function(req, res) {
  res.redirect('/users/profile/'+req.user.values._id);
};


//section: PAGES

/* GET /users/profile/:uid
 * profile page for a specific user*/
exports.viewUser = function(req, res) {
  var options = { xhr: req.xhr };
  res.render('js/views/user/profile', options);
};

/* GET /users/notifications
 * view all the notifications for the current user */
exports.viewNotifications = function(req, res) {
  var options = { xhr: req.xhr };
  res.render('js/views/user/notifications', options);
};

/* GET /users/messages
 * view all the messages for the current user */
exports.viewMessages = function(req, res) {
  var options = { xhr: req.xhr };
  res.render('js/views/user/messages', options);
};

/* GET /users -- requiresDekel
 * view all users on the site, super admin only */
exports.usersList = function(req, res) {
  var options = { xhr: req.xhr };
  res.render('js/views/user/list', options);
};


//section: ACTIONS

/* PUT /users/profile/:uid -- requiresLogin
 * Make changes to your own user or force changes on other users (admin) */
exports.editUser = function(req, res) {
  res.send(JSON.stringify(
      {message: 'request to change user' + 
      ' from userid='+req.user.values._id}
    )
  );
};

/* PUT /users/profile/:uid -- requiresLogin
 * Make changes to your own user or force changes on other users (admin) */
exports.editUser = function(req, res) {
  res.send(JSON.stringify(
      {message: 'request to edit user' + 
      ' from userid='+req.user.values._id}
    )
  );
};

/* DELETE /users/profile/:uid/services -- requiresLogin
 * unauthenticate a service (i.e. facebook, g+, github) */
exports.removeService = function(req, res) {
  res.send(JSON.stringify(
      {message: 'request to unauthenticate service' + 
      ' from userid='+req.user.values._id}
    )
  );
};

/* DELETE /users/profile/:uid -- requiresLogin
 * Disables a user; unauthenticate all services and prevent checkins */
exports.disableUser = function(req, res) {
  res.send(JSON.stringify(
      {message: 'request to disable user' + 
      ' from userid='+req.user.values._id}
    )
  );
};

/* DELETE /users/profile/:uid/perma -- requiresDekel
 * Permanently deletes a user and all records of him */
exports.permaDeleteUser = function(req, res) {
  res.send(JSON.stringify(
      {message: 'request to permanently delete user' + 
      ' from userid='+req.user.values._id}
    )
  );
};

/* POST /users/profile/:uid/perma -- requiresLogin
 * post a request to the site admin to prema-delete self*/
exports.requestRemoval = function(req, res) {
  res.send(JSON.stringify(
      {message: 'request for admin removal of current user' + 
      ' from userid='+req.user.values._id}
    )
  );
};
