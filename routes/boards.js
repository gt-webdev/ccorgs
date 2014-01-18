'use strict';

var Events = require('../lib/hardcode').Events,
    async = require('async');

//section: PAGES

/* GET /boards/:vanity
 * returns the data for the boards available for an org */
exports.listOrgBoards = function(req, res) {
  res.send(JSON.stringify(
      {message: 'request for org boards' + 
      ' from userid='+req.user.values._id}
    )
  );
};

/* GET /boards/:vanity/event/:evid
 * returns the data for the board for an event */
exports.viewEventBoard = function(req, res) {
  res.send(JSON.stringify(
      {message: 'request for event board' + 
      ' from userid='+req.user.values._id}
    )
  );
};

/* GET /boards/:vanity/:boardid
 * returns the data for a specific org board */
exports.viewOrgBoard = function(req, res) {
  res.send(JSON.stringify(
      {message: 'request for org board' + 
      ' from userid='+req.user.values._id}
    )
  );
};


//section: ACTIONS

/* POST /boards/:vanity
 * creates a new board for a particular org */
exports.createOrgBoard = function(req, res) {
  res.send(JSON.stringify(
      {message: 'request to create org board' + 
      ' from userid='+req.user.values._id}
    )
  );
};

/* POST /boards/:vanity/:boardid
 * posts a new message on a particular org board */
exports.postToOrgBoard = function(req, res) {
  res.send(JSON.stringify(
      {message: 'request to post to an org board' + 
      ' from userid='+req.user.values._id}
    )
  );
};

/* DELETE /boards/:vanity/:boardid
 * deletes a certain board from an org */
exports.deleteBoard = function(req, res) {
  res.send(JSON.stringify(
      {message: 'request to delete an org board' + 
      ' from userid='+req.user.values._id}
    )
  );
};

/* POST /boards/:vanity/events/:evid
 * posts a new message on a particular event's board */
exports.postToEventBoard = function(req, res) {
  res.send(JSON.stringify(
      {message: 'request to post to an event board' + 
      ' from userid='+req.user.values._id}
    )
  );
};


