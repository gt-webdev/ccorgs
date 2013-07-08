var orgStore = require('../lib/hardcode'),
    util = require('util');

module.exports.view_org = function(req, res) {
  orgStore.getOrgBySlug(req.params.vanity, function(err, org) {
    if (err) {
      res.send(err);
    } else {
      res.send(util.inspect(org));
    }
};

exports.list_orgs =function(req, res) {
  res.send('orgs list');
};
