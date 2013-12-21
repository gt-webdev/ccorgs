'use strict';

var orgs = require('../routes/orgs'),
    users = require('../routes/users'),
    events = require('../routes/events'),
    auth = require('./auth');

exports.configure = function(app) {
  /*
   * Generally speaking, the site is designed to have 3 main components:
   * Orgs, Events and Users. Each route defined here should either belong
   * under one of these categories or under 'misc'.
   */

  //Orgs
  app.post('/orgs/:vanity/members', auth.requiresLogin, orgs.addMember);
  app.delete('/orgs/:vanity/members', auth.requiresLogin, orgs.removeMember);
  app.post('/orgs/:vanity/star', auth.requiresLogin, orgs.toggleStar);
  app.post('/orgs/:vanity/message', auth.requiresLogin, orgs.contactAdmins);
  app.post('/boards/:vanity', auth.requiresMod, boards.createOrgBoard);
  app.post('/boards/:vanity/:boardid', auth.requiresLogin, boards.postToOrgBoard);
  app.delete('/boards/:vanity/:boardid', auth.requiresMod, boards.deleteBoard);
  app.put('/orgs/:vanity', auth.requiresMod, orgs.editOrg);
  app.post('/events', auth.requiresMod, events.createEvent);
  app.post('/orgs/:vanity/announcements', auth.requiresMod, orgs.makeAnnouncement);
  app.post('/orgs/:vanity/resources', auth.requiresMod, orgs.addResource);
  app.put('/orgs/:vanity/resources/:refid', auth.requiresMod, orgs.editResource);
  app.delete('/orgs/:vanity/resources/:refid', auth.requiresMod, orgs.deleteResource);
  app.post('/orgs/:vanity/supermessage', auth.requiresMod, orgs.contactManagers);
  app.post('/orgs/:vanity/officers', auth.requiresAdmin, orgs.addOfficer);
  app.delete('/orgs/:vanity/officers', auth.requiresAdmin, orgs.deleteOfficer);
  app.put('/orgs/:vanity/flair', auth.requiresAdmin, orgs.editFlair);

  //Events
  app.post('/orgs/:vanity/events/:evid/checkin', auth.requiresLogin, events.checkIn);
  app.post('/orgs/:vanity/events/:evid/guest', events.guest);
  app.post('/orgs/:vanity/events/:evid/survey', events.answerSurvey);
  app.post('/orgs/:vanity/events/:evid/subscribe', auth.requiresLogin, events.subscribe);
  app.post('/orgs/:vanity/events/:evid/invite', auth.requiresLogin, events.invite);
  app.post('/orgs/:vanity/events/:evid/tag', auth.requiresLogin, events.tag);
  app.post('/boards/:vanity/events/:evid', auth.requiresLogin, boards.postToEventBoard);
  app.post('/orgs/:vanity/events/:evid/resources', auth.requiresMod, events.addResource);
  app.put('/orgs/:vanity/events/:evid/resources/:resid', auth.requiresMod, events.deleteResource);
  app.delete('/orgs/:vanity/events/:evid/resources/:resid', auth.requiresMod, events.editResource);
  app.put('/orgs/:vanity/events/:evid', auth.requiresMod, events.editEvent);

  //Users
  app.put('/users/profile/:uid', auth.requiresLogin, users.editUser);
  app.delete('/users/profile/:uid/services', auth.requiresLogin, users.removeService);
  app.delete('/users/profile/:uid', auth.requiresLogin, users.disableUser);
  app.post('/users/profile/:uid/perma', auth.requiresLogin, users.requestRemoval);
  app.delete('/users/profile/:uid/perma', auth.requiresDekel, users.permaDeleteUser);
}
