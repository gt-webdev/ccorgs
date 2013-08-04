'use strict';

var Events = require('../lib/hardcode').Events,
    util = require('util');

module.exports.listEvents = function(req, res) {
  Events.getAll(function(err, events) {
    res.send(util.inspect(events));
  });
};

module.exports.listEventsFromOrg = function(req, res) {
  Events.getByOrgSlug(req.params["vanity"], function(err, event) {
    if (err) {
      res.send(err);
    } else {
      res.send(util.inspect(event));
    }
  });
};

module.exports.viewEvent = function(req, res) {
  Events.getById(req.params["evid"], function(err, event) {
    if (err) {
      res.send(err);
    } else {
      res.send(util.inspect(event));
    }
  });
};

module.exports.viewLatest = function(req, res) {
  Events.getByOrgSlug(req.params["vanity"], function(err, events) {
    if (err) {
      res.send(err);
    } else {
      res.send(util.inspect(events[0]));
    }
  });
};

module.exports.createEvent = function(req, res) {
  var event_data = {
    name: req.body["title"] || "untitled",
    body: req.body["body"] || "*I have no body!*"
  };
  Events.createEvent(event_data, function(err, event) {
    var path;
    if (err) {
      return res.error(err);
    }
    path = "/" + event.org.slug + "/events/" + event._id;
    console.log("REDIRECTING to", path);
    res.redirect(path);
  });
};

exports.updateEvent = function(req, res, next) {
  Events.getById(req.params["evid"], function(err, event) {
    if (err) {
      next(err);
    } else {
      event.title = req.body["title"] || event.title;
      event.body = req.body["body"] || event.body;
      Events.updateEvent(event, function(err) {
        if (err) {
          return next(err);
        }
        next();
      });
    }
  });
};

exports.deleteEvent = function(req, res, next) {
  Events.getById(req.params["evid"], function(err, event) {
    if (err) {
      next(err);
    } else {
      Events.deleteEvent(event, function(err) {
        if (err) {
          return next(err);
        }
        res.location("../..");
        next();
      });
    }
  });
};
