var Events = require('../lib/hardcode').Events,
    util = require('util');

module.exports.listEvents = function(req, res) {
  console.log(req.user);
  Events.getAll(function(err, events) {
    res.send(util.inspect(events));
  });
};

module.exports.listEventsFromOrg = function(req, res) {
  console.log(req.user);
  Events.getByOrgSlug(req.params["vanity"], function(err, event) {
    if (err) {
      res.send(err);
    } else {
      res.send(util.inspect(event));
    }
  });
};

module.exports.viewEvent = function(req, res) {
  console.log(req.user);
  Events.getById(req.params["evid"], function(err, events) {
    if (err) {
      res.send(err);
    } else {
      res.send(util.inspect(events));
    }
  });
};

module.exports.viewLatest = function(req, res) {
  console.log(req.user);
  Events.getByOrgSlug(req.params["vanity"], function(err, events) {
    if (err) {
      res.send(err);
    } else {
      res.send(util.inspect(events[0]));
    }
  });
};
