'use strict';

var orgs = require('../routes/orgs'),
    users = require('../routes/users'),
    events = require('../routes/events'),
    auth = require('./auth');

exports.define = function(app) {
  //Redirection to '/' with a POST still leads to home page
  app.post('/', orgs.listOrgs);
  //CREATE
  app.post('/orgs', auth.requiresAdmin, orgs.createOrg);
  app.post('/orgs/:vanity/events', auth.requiresMod, events.createEvent);
  app.post('/orgs/:vanity/members', auth.requiresLogin, orgs.addMember)
  //app.post('/users', users.createUser); creating a user is a part of the
  //auth lib found in `lib/auth.js` the route is not defined here. this comment
  //is just used to direct people who are grepping for this method

  //READ
  app.get('/', orgs.listOrgs);
  app.get('/orgs', orgs.listOrgs);
  app.get('/events', events.listEvents);
  app.get('/users', auth.requiresAdmin, users.listUsers);
  app.get('/users/profile', auth.requiresLogin, users.viewSelf);
  app.get('/users/profile/:uid', auth.requiresLogin, users.viewUser);
  // shortend for orgs, excluding the /orgs/ prefix
  app.get('/:vanity', orgs.viewOrg);
  app.get('/:vanity/latest', events.viewLatest);
  app.get('/:vanity/events', events.listEventsFromOrg);
  app.get('/:vanity/events/:evid', events.viewEvent);
  // normal way to access orgs handlers using /orgs/ prefix
  app.get('/orgs/:vanity', orgs.viewOrg);
  app.get('/orgs/:vanity/latest', events.viewLatest);
  app.get('/orgs/:vanity/events', events.listEventsFromOrg);
  app.get('/orgs/:vanity/events/:evid', events.viewEvent);
  
  //UPDATE
  app.put('/orgs/:vanity', auth.requiresMod, orgs.updateOrg, orgs.viewOrg);
  app.put('/orgs/:vanity/events/:evid', auth.requiresMod, events.updateEvent,
      events.viewEvent);
  app.put('/users/profile', auth.requiresLogin, users.updateUser,
      users.viewSelf);
  app.put('/users/profile/:uid', auth.requiresAdmin, users.updateUser,
      users.viewUser);

  //DELETE
  app["delete"]('/orgs/:vanity', auth.requiresAdmin, orgs.deleteOrg,
      orgs.listOrgs);
  app["delete"]('/orgs/:vanity/events/:evid', auth.requiresMod,
      events.deleteEvent, orgs.viewOrg);
  /* app["delete"]('/users/profile', auth.requiresLogin, users.deleteUser,
   *    orgs.listOrgs);
   * app["delete"]('/users/profile/:uid', auth.requiresAdmin, users.deleteUser,
   *    orgs.listOrgs);
   * Please see note above regarding CRUD handling of user information within
   * lib/auht.js instead of as a part of the routes file (search `createUser`)
   */
};

exports.blacklist = [
  "events",
  "users",
  "admin",
  "help",
  "orgs",
  "auth"
];
