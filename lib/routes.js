var orgs = require('../routes/orgs'),
    users = require('../routes/users'),
    events = require('../routes/events'),
    auth = require('./auth');

exports.define = function(app) {
  app.get('/', orgs.listOrgs);
  app.get('/events', events.listEvents);
  app.get('/users', auth.requiresAdmin, users.listUsers);
  app.get('/users/profile', auth.requiresLogin, users.viewSelf);
  app.get('/users/profile/:uid', auth.requiresLogin, users.viewUser);
  app.get('/:vanity', orgs.viewOrg);
  app.get('/:vanity/latest', events.viewLatest);
  app.get('/:vanity/events', events.listEventsFromOrg);
  app.get('/:vanity/events/:evid', events.viewEvent);
};

exports.blacklist = [
  "/events",
  "/users",
  "/admin",
  "/help",
  "/auth"
];
