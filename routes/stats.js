'use strict';

var Events = require('../lib/hardcode').Events,
    Orgs = require('../lib/hardcode').Orgs,
    async = require('async');

//section: PAGES

/* GET /stats
 * returns the data for the stats for the site as a whole */
exports.siteStats = function(req, res) {
  res.send(JSON.stringify(
      {message: 'request for site stats' + 
      ' from userid='+req.user.values._id}
    )
  );
};

/* GET /stats/users/:uid
 * returns the data  for the stats for a single users participation in Orgs
 * the current user is allowed to administer */
exports.userStats = function(req, res) {
  res.send(JSON.stringify(
      {message: 'request for user stats' + 
      ' from userid='+req.user.values._id}
    )
  );
};

/* GET /stats/:vanity
 * returns the data  for the stats for a single org */
exports.orgStats = function(req, res) {
  res.send(JSON.stringify(
      {message: 'request for org stats' + 
      ' from userid='+req.user.values._id}
    )
  );
};

/* GET /stats/:vanity/:evid
 * returns the data  for the stats for a single event */
exports.eventStats = function(req, res) {
  res.send(JSON.stringify(
      {message: 'request for event stats' + 
      ' from userid='+req.user.values._id}
    )
  );
};
