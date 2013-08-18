'use strict';

var Orgs = require('../lib/hardcode').Orgs,
    async = require('async'),
    md5 = require('MD5');
    //util = require('util');

module.exports.viewOrg = function(req, res) {
  req.models.Org.findOne(
    {slug: req.params["vanity"]},
    [],
    function(err, org) {
      if (err) {
        return res.send(404);
      }
      if (!org || !org.values) {
        return res.send(404);
      }
      if (req.ajaxify) {
        res.send(JSON.stringify({
          jsView: '/js/orgs/viewOrg.js',
          pageData: org.values
        }));
      } else {
        res.render('index', {
          loadPage: true,
          jsView: '/js/orgs/viewOrg.js',
          pageData: org.values
        });
      }
    }
  );
};

exports.listOrgs = function(req, res) {
  req.models.Org.customSearch(
    {},
    [],
    function(err, orgs) {
      if (err) {
        return res.send(404);
      }
      if (!orgs) {
        return res.send(404);
      }
      async.map(orgs,
        function(org, cb) {
          cb(null, org.values);
        },
        function(err, orgsArr) {
          if (req.ajaxify) {
            res.send(JSON.stringify({
              jsView: '/js/orgs/listOrgs.js',
              pageData: orgsArr
            }));
          } else {
            res.render('index', {
              loadPage: true,
              jsView: '/js/orgs/listOrgs.js',
              pageData: orgsArr
            });
          }
        }
      );
    }
  );
};

exports.createOrg = function(req, res) {
  if (!req.body["name"] || !req.body["slug"]) {
    return res.send(410);
  }
  var org_data = {
    name: req.body["name"],
    slug: req.body["slug"],
    cover: req.body["cover"] || "#007fff",
    short: req.body["short"] || "An org for propane and propane accessories",
    email: req.body["email"] || "",
    emailHash: md5((req.body["email"] || "reindeer@flotilla.qz"))
  };
  var new_org = new req.models.Org(org_data);
  new_org.embed('admin', req.user);
  new_org.save(function(err, orgObj) {
    if (err) {
      return res.send(500);
    }
    res.redirect("/");
  });
};

exports.updateOrg = function(req, res, next) {
  req.models.Org.findOne({slug: req.params["vanity"]}, function(err, org) {
    if (err) {
      next(err);
    } else {
      console.log("update org", org.values.name);
    }
  });
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
