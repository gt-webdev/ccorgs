'use strict';

var Events = require('../lib/hardcode').Events,
    async = require('async');

module.exports.listEvents = function(req, res) {
  req.models.Event.customSearch(
    {},
    [],
    function(err, events) {
      if (err) {
        return res.send(404);
      }
      if (!events) {
        return res.send(404);
      }
      async.map(events,
        function(event, cb) {
          cb(null, event.values);
        },
        function(err, eventsArr) {
          if (req.ajaxify) {
            res.send(JSON.stringify({
              jsView: '/js/events/listEvents.js',
              pageData: {events: eventsArr}
            }));
          } else {
            res.render('index', {
              loadPage: true,
              jsView: '/js/events/listEvents.js',
              pageData: {events: eventsArr}
            });
          }
        }
      );
    }
  );
};

module.exports.listEventsFromOrg = function(req, res) {
  if (!req.params["vanity"]) {
    return res.send(404);
  }
  req.models.Event.customSearch(
    {
      'org.slug': req.params["vanity"]
    },
    [],
    function(err, events) {
      if (err) {
        return res.send(404);
      }
      if (!events) {
        return res.send(404);
      }
      async.map(events,
        function(event, cb) {
          cb(null, event.values);
        },
        function(err, eventsArr) {
          if (req.ajaxify) {
            res.send(JSON.stringify({
              jsView: '/js/events/listEvents.js',
              pageData: {events: eventsArr}
            }));
          } else {
            res.render('index', {
              loadPage: true,
              jsView: '/js/events/listEvents.js',
              pageData: {events: eventsArr}
            });
          }
        }
      );
    }
  );
};

module.exports.viewEvent = function(req, res) {
  if (!req.params["vanity"] || !req.params["evid"]) {
    return res.send(404);
  }
  req.models.Event.findOne(
    {
      'org.slug': req.params["vanity"],
      '_id': req.models.Event.ObjectID(req.params["evid"])
    },
    [],
    function(err, event) {
      if (err) {
        return res.send(404);
      }
      if (!event || !event.values) {
        return res.send(404);
      }
      if (req.ajaxify) {
        res.send(JSON.stringify({
          jsView: '/js/events/viewEvent.js',
          pageData: {event: event.values}
        }));
      } else {
        res.render('index', {
          loadPage: true,
          jsView: '/js/events/viewEvent.js',
          pageData: {event: event.values}
        });
      }
    }
  );
};

module.exports.viewLatest = function(req, res) {
  if (!req.params["vanity"]) {
    return res.send(404);
  }
  req.models.Event.customSearchC(
    {
      'org.slug': req.params["vanity"]
    },
    [],
    function(err, cursor) {
      if (err) {
        return res.send(404);
      }
      //sort cursor by start date in descending order
      cursor.sort({stime: -1});
      //limit to one result
      cursor.limit(1);
      //convert the cursor to an array of remongo objects
      req.models.Event.cursorToRemongoArray(cursor, function(err, events) {
        if (err) {
          return res.send(404);
        }
        if (events.length != 1) {
          return res.send(404);
        }
        var event = events[0];
        //render view
        if (req.ajaxify) {
          res.send(JSON.stringify({
            jsView: '/js/events/viewEvent.js',
            pageData: {event: event.values}
          }));
        } else {
          res.render('index', {
            loadPage: true,
            jsView: '/js/events/viewEvent.js',
            pageData: {event: event.values}
          });
        }
      });
    }
  );
};

module.exports.createEvent = function(req, res) {
  if (!req.body["title"] || !req.body["desc"] || !req.params["vanity"]) {
    return res.send(400);
  }
  // parse start-time and end-time but default to stime = NOW and 
  // etime = IN ONE HOUR if we can't process the data correctly
  var stime, etime;
  if (req.body["stime"] && parseInt(req.body["stime"], 10)) {
    stime = new Date(parseInt(req.body["stime"],10));
  } else {
    stime = new Date();
  }
  if (req.body["etime"] && parseInt(req.body["stime"], 10)) {
    etime = new Date(parseInt(req.body["etime"],10));
  } else {
    etime = new Date(stime.getTime() + 60*60*1000);
  }
  var event_data = {
    title: req.body["title"],
    stime: stime,
    etime: etime,
    short: req.body["short"] || "An event for propane and propane accessories",
    desc: [{name: "Description", type: "markdown", body: req.body['desc']}]
  };
  var new_event = new req.models.Event(event_data);
  req.models.Org.findOne(
    {slug: req.params["vanity"]},
    [],
    function(err, org) {
      console.log(org);
      if (err || !org) {
        return res.send(404);
      }
      new_event.embed('org', org);
      new_event.save(function(err, eventObj) {
        if (err) {
          return res.send(500);
        }
        org.embed('events', new_event);
        org.save(function(err, newOrgObj) {
          if (err) {
            return res.send(500);
          }
          res.redirect(req.url);
        });
      });
    }
  );
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
