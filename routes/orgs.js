'use strict';

var Orgs = require('../lib/hardcode').Orgs,
    async = require('async'),
    md5 = require('MD5');
    //util = require('util');


//section: REDIRECTS

/* GET /
 * root of the site, redirect to /orgs */
exports.root = function(req, res) {
  res.redirect('/orgs');
};


/* GET /:vanity
 * redirect to org's page: /orgs/:vanity */
exports.vanityRedirect = function(req, res) {
  res.redirect('/orgs/' + req.params["vanity"]);
};


//section: PAGES

/* GET /orgs
 * show all the orgs on the system. Act as main page for the site */
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
          res.renderWithAjax('/js/orgs/listOrgs.js',
            {orgs: orgsArr});
        }
      );
    }
  );
};

/* GET /orgs/:vanity
 * show a single org's page */
exports.viewOrg = function(req, res) {
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
      res.renderWithAjax('/js/orgs/viewOrg.js',
        {org: org.values});
    }
  );
};


/* GET /orgs/create -- requiresDekel
 * the form that creates a new org */
exports.createOrgForm = function(req, res) {
  res.renderWithAjax('/js/orgs/createOrgForm.js',
    {});
};


//section: Actions

/* POST /orgs/:vanity/members -- requiresLogin
 * add self/user as a member of an org */
exports.addMember = function(req, res) {
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
      org.embed('members', req.user);
      org.save(function(err, orgObj) {
        if (err) {
          return res.send(500);
        }
        res.redirect('/orgs/' + req.params["vanity"]);
      });
    }
  );
};


/* DELETE /orgs/:vanity/members -- requiresLogin
 * removes self/user as a member of an org */
exports.removeMember = function(req, res) {
  res.send(JSON.stringify(
      {message: 'request to delete user for org='+req.params['vanity']}
    )
  );
};


/* POST /orgs/:vanity/star -- requiresLogin
 * Star or unstar an org, if not a member */
exports.toggleStar = function(req, res) {
  res.send(JSON.stringify(
      {message: 'request to toggle star for org='+req.params['vanity'] + 
      ' on userid='+req.user.values._id}
    )
  );
};


/* POST /orgs/:vanity/message -- requiresLogin
 * Send a message to all leaders of an org */
exports.contactAdmins = function(req, res) {
  res.send(JSON.stringify(
      {message: 'request to contact officers for org='+req.params['vanity'] + 
      ' from userid='+req.user.values._id}
    )
  );
};


/* PUT /orgs/:vanity -- requiresMod
 * make changes to the org's description page */
exports.editOrg = function(req, res) {
  res.send(JSON.stringify(
      {message: 'request to edit org='+req.params['vanity'] + 
      ' from userid='+req.user.values._id}
    )
  );
};


/* POST /orgs/:vanity/announcements -- requiresMod
 * make an announcement for the entire org and those who starred it */
exports.makeAnnouncement = function(req, res) {
  res.send(JSON.stringify(
      {message: 'request to edit org='+req.params['vanity'] + 
      ' from userid='+req.user.values._id}
    )
  );
};


/* POST /orgs/:vanity/resources -- requiresMod
 * Add a resource to an org's page */
exports.addResource = function(req, res) {
  res.send(JSON.stringify(
      {message: 'request to add resource to org='+req.params['vanity'] + 
      ' from userid='+req.user.values._id}
    )
  );
};


/* PUT /orgs/:vanity/resources/:resid -- requiresMod
 * edit a resource on an org's page */
exports.editResource = function(req, res) {
  res.send(JSON.stringify(
      {message: 'request to edit resource on org='+req.params['vanity'] + 
      ' from userid='+req.user.values._id}
    )
  );
};


/* DELETE /orgs/:vanity/resources/:resid -- requiresMod
 * delete a resource on an org's page */
exports.deleteResource = function(req, res) {
  res.send(JSON.stringify(
      {message: 'request to delete resource on org='+req.params['vanity'] + 
      ' from userid='+req.user.values._id}
    )
  );
};


/* POST /orgs/:vanity/supermessage -- requiresMod
 * send a message between org officers and site managers */
exports.contactManagers = function(req, res) {
  res.send(JSON.stringify(
      {message: 'request to contact managers from org='+req.params['vanity'] + 
      ' from userid='+req.user.values._id}
    )
  );
};


/* POST /orgs/:vanity/officers -- requiresAdmin
 * add a new officer to an org */
exports.addOfficer = function(req, res) {
  res.send(JSON.stringify(
      {message: 'request to add officer to org='+req.params['vanity'] + 
      ' from userid='+req.user.values._id}
    )
  );
};


/* DELETE /orgs/:vanity/officers -- requiresAdmin
 * remove an officer from an org */
exports.deleteOfficer = function(req, res) {
  res.send(JSON.stringify(
      {message: 'request to remove an officer from org='+req.params['vanity'] + 
      ' from userid='+req.user.values._id}
    )
  );
};


/* PUT /orgs/:vanity/flair --requiresAdmin
 * edits flair on users of an org */
exports.editFlair = function(req, res) {
  res.send(JSON.stringify(
      {message: 'request to edit flair for org='+req.params['vanity'] + 
      ' from userid='+req.user.values._id}
    )
  );
};


//section: LEGACY AND UNUSED
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
