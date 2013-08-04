'use strict';

var Orgs = require('../lib/hardcode').Orgs,
    util = require('util');

module.exports.viewOrg = function(req, res) {
  Orgs.getOrgBySlug(req.params["vanity"], function(err, org) {
    if (err) {
      res.send(err);
    } else {
      res.send(util.inspect(org));
    }
  });
};

exports.listOrgs = function(req, res) {
  Orgs.getAll(function(err, orgs) {
    res.send(util.inspect(orgs));
  });
};

exports.createOrg = function(req, res) {
  var org_data = {
    name: req.body["name"] || "no-name",
    slug: req.body["slug"] || "no-slug"
  };
  Orgs.createOrg(org_data, function(err) {
    if (err) {
      return res.error(err);
    }
    res.redirect("/");
  });
};

exports.updateOrg = function(req, res, next) {
  Orgs.getOrgBySlug(req.params["vanity"], function(err, org) {
    if (err) {
      next(err);
    } else {
      org.name = req.body["name"] || org.name;
      org.slug = req.body["slug"] || org.slug;
      Orgs.updateOrg(org, function(err) {
        if (err) {
          return next(err);
        }
        next();
      });
    }
  });
};

exports.deleteOrg = function(req, res, next) {
  Orgs.getOrgBySlug(req.params["vanity"], function(err, org) {
    if (err) {
      next(err);
    } else {
      Orgs.deleteOrg(org, function(err) {
        if (err) {
          return next(err);
        }
        res.location("..");
        next();
      });
    }
  });
};
