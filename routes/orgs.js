var Orgs = require('../lib/hardcode').Orgs,
    util = require('util');

module.exports.viewOrg = function(req, res) {
  console.log(req.user);
  Orgs.getOrgBySlug(req.params["vanity"], function(err, org) {
    if (err) {
      res.send(err);
    } else {
      res.send(util.inspect(org));
    }
  });
};

exports.listOrgs =function(req, res) {
  console.log(req.user);
  Orgs.getAll(function(err, orgs) {
    res.send(util.inspect(orgs));
  });
};
