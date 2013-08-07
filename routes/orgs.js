'use strict';

var Orgs = require('../lib/hardcode').Orgs,
    util = require('util');

module.exports.viewOrg = function(req, res) {
  Orgs.getOrgBySlug(req.params["vanity"], function(err, org) {
    if (err) {
      res.send(err);
    } else {
      res.render('index', {
        loadPage: true, 
        jsView: '/js/orgs/viewOrg.js', 
        pageData: org
      });
    }
  });
};

exports.listOrgs = function(req, res) {
  Orgs.getAll(function(err, orgs) {
    if (req.ajaxify) {
      res.send(JSON.stringify({
        jsView: '/js/orgs/listOrgs.js',
        data: orgs
      }));
    } else {
      res.render('index', {
        loadPage: true, 
        jsView: '/js/orgs/listOrgs.js', 
        pageData: orgs
      });
    }
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
