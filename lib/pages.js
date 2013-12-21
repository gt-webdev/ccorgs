'use strict';

var orgs = require('../routes/orgs'),
    users = require('../routes/users'),
    events = require('../routes/events'),
    stats = require('../routes/stats'),
    boards = require('../routes/boards'),
    auth = require('./auth');

exports.configure = function(app) {
  /*
   * Generally speaking, the site is designed to have 3 main components:
   * Orgs, Events and Users. Each route defined here should either belong
   * under one of these categories or under 'misc'.
   */
  
  //Orgs
  app.get('/', orgs.root); //redirect
  app.get('/orgs', orgs.listOrgs);
  app.get('/:vanity', orgs.vanityRedirect); //redirect
  app.get('/orgs/:vanity', orgs.viewOrg);

  //Events
  app.get('/events', events.listEvents);
  app.get('/:vanity/events', events.vanityListRedirect); //redirect
  app.get('/:vanity/events/:evid', events.vanityOrgEventsRedirect); //redirect
  app.get('/:vanity/now', events.vanityNowRedirect); //redirect
  app.get('/orgs/:vanity/events', events.eventsByOrg); //smart redirect
  app.get('/orgs/:vanity/now', events.currentEventsByOrg); //smart redirect
  app.get('/orgs/:vanity/events/:evid', events.events.eventById);

  //Users
  app.get('/users/profile', auth.requiresLogin, users.viewSelf); //redirect
  app.get('/users/profile/:uid', users.viewUser);
  app.get('/users/notifications', auth.requiresLogin, users.viewNotifications);
  app.get('/users/messages', auth.requiresLogin, users.viewMessages);

  //Misc - additional information/content that can be displayed, but is 
  // requested seperately from page requests

  /* discussion boards
   * orgs and events can have discussion boards which exist in a seperate 
   * database and are queried seperately 
   */
  app.get('/boards/:vanity', auth.requiresLogin, boards.listOrgBoards);
  app.get('/boards/:vanity/event/:evid', auth.requiresLogin, boards.viewEventBoard);
  app.get('/boards/:vanity/:boardid', auth.requiresLogin, boards.viewOrgBoard);

  /* stats
   * this information is accessible only to officers, administrators and Dekels.
   * When optimizations are in place, these functions will be given low-pri to
   * ensure that end-users have a smoother experience, since these functions may
   * take some time to calculate
   */
  app.get('/stats', auth.requiresDekel, stats.siteStats);
  app.get('/stats/users/:uid', auth.requiresMod, stats.userStats);
  app.get('/stats/:vanity', auth.requiresMod, stats.orgStats);
  app.get('/stats/:vanity/:evid', auth.requiresMod, stats.eventStats);

  //Super Privileged - these pages should only be rendered by admins or Dekels
  app.get('/orgs/create', auth.requiresDekel, orgs.createOrgForm);
  app.get('/users', auth.requiresDekel, users.usersList);
};
