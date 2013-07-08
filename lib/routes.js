var orgs = require('../routes/orgs'),
    auth = require('./auth');

exports.define = function(app) {
  app.get('/', orgs.list_orgs);
  app.get('/:vanity', orgs.view_org);
};
