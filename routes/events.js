'use strict';

var Events = require('../lib/hardcode').Events,
    async = require('async');

//section: REDIRECTS

/* GET /:vanity/*
 * Function to be used to properly redirect the :vanity shortcut to 
 * /orgs/:vanity */
exports.vanityPrefixRedirect = function(req, res) {
  res.redirect('/orgs/' + req.url);
};

/* GET /orgs/:vanity/now
 * show the list of events from a specific org */
exports.currentEventsByOrg = function(req, res) {
  req.models.Event.customSearch(
    {"org.slug": req.params['vanity']
      //start time is greater than 30 minutes ago, less than an hour from now
      //sort by latest start time, descending
    },
    [],
    function(err, events) {
      if (err) return res.send(404);
      if (!events || events.length === 0) return res.redirect('/orgs/:vanity');
      //For now just redirect to the first event on the list
      return res.redirect('/orgs/:vanity/events/' + events[0].values._id);
      //DISABLED for now. Once events lookup page is active, enable this
      if (events.length > 1) {
        //More than one event qualify, redirect to events lookup page with 
        //appropriate filters
        res.redirect('/events/org/' + req.params["vanity"] + '/now');
      } else {
        //Ony one event qualify, redirect to that event
        res.redirect('/orgs/:vanity/events/' + events[0].values._id);
      }
    }
  );
};


//section: PAGES

/* GET /events 
 * list all events, respect offset & amount in querystring */
exports.listEvents = function(req, res) {
  req.models.Event.customSearchC(
    {},
    [],
    function(err, cursor) {
      cursor.sort({stime: -1})
        .skip(parseInt(req.query.offset || '0'))
        .limit(parseInt(req.query.amout || '10'))
      req.models.Event.cursorToRemongoArray(cursor, function(err, events) {
        if (err) return res.send(500);
        if (!events || events.length === 0) return res.send(404);
        return res.render('js/views/events/list', 
          {xhr: req.xhr, events: events});
      });
    }
  );
}

/* GET /orgs/:vanity/events/:evid
 * shows the event page based on the org's vanity and the event id */
exports.eventById = function(req, res) {
  req.models.Event.findOne(
    { "org.slug": req.params['vanity'],
      "_id": req.params['evid']},
    [],
    function(err, event) {
      if (err || !event) return res.send(404);
      res.render('js/views/events/event', {xhr: req.xhr, event: event});
    }
  );
};


//section: ACTIONS

/* POST /Events -- requiresMod
 * creates a new event, must check for ability to create event for the 
 * specified org */
exports.createEvent = function(req, res) {
  res.send(JSON.stringify(
      {message: 'request to create event' + 
      ' from userid='+req.user.values._id}
    )
  );
};

/* POST /orgs/:vanity/events/:evid/checkin -- requiresLogin
 * attempt to checkin to an event through the site */
exports.checkIn = function(req, res) {
  res.send(JSON.stringify(
      {message: 'request to check in to an  event' + 
      ' from userid='+req.user.values._id}
    )
  );
};

/* POST /orgs/:vanity/events/:evid/guest 
 * attempt to checkin to an event as a guest */
exports.guest = function(req, res) {
  res.send(JSON.stringify(
      {message: 'request to check in to an event as a guest'}
    )
  );
};

/* POST /orgs/:vanity/events/:evid/survey -- requiresLogin
 * attempt to fill out a survey for an event */
exports.answerSurvey = function(req, res) {
  res.send(JSON.stringify(
      {message: 'request to answer a survey' + 
      ' from userid='+req.user.values._id}
    )
  );
};

/* POST /orgs/:vanity/events/:evid/subscribe -- requiresLogin
 * subscribe to future instances of a future event */
exports.subscribe = function(req, res) {
  res.send(JSON.stringify(
      {message: 'request to subscribe to an event' + 
      ' from userid='+req.user.values._id}
    )
  );
};

/* POST /orgs/:vanity/events/:evid/invite -- requiresLogin
 * invite a friend to an event */
exports.invite = function(req, res) {
  res.send(JSON.stringify(
      {message: 'request to invite a friend to an event' + 
      ' from userid='+req.user.values._id}
    )
  );
};

/* POST /orgs/:vanity/events/:evid/tag -- requiresLogin
 * attempt to submit a tag for an event */
exports.tag = function(req, res) {
  res.send(JSON.stringify(
      {message: 'request to add a tag to an event' + 
      ' from userid='+req.user.values._id}
    )
  );
};

/* POST /orgs/:vanity/events/:evid/resources -- requiresMod
 * attempt to add a resource to an event */
exports.addResource = function(req, res) {
  res.send(JSON.stringify(
      {message: 'request to add a resource to an event' + 
      ' from userid='+req.user.values._id}
    )
  );
};

/* PUT /orgs/:vanity/events/:evid/resources/:resid -- requiresMod
 * attempt to change a resource that's already attached to an event*/
exports.editResource = function(req, res) {
  res.send(JSON.stringify(
      {message: 'request to edit a resource' + 
      ' from userid='+req.user.values._id}
    )
  );
};

/* DELETE /orgs/:vanity/events/:evid/resources/:resid -- requiresMod
 * attempt to delete a resource that's attached to an event */
exports.deleteResource = function(req, res) {
  res.send(JSON.stringify(
      {message: 'request to delete a resource' + 
      ' from userid='+req.user.values._id}
    )
  );
};

/* PUT /orgs/:vanity/events/:evid -- requiresMod
 * attempt to edit an event */
exports.editEvent = function(req, res) {
  res.send(JSON.stringify(
      {message: 'request to check in to an  event' + 
      ' from userid='+req.user.values._id}
    )
  );
};
