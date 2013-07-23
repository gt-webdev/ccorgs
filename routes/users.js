var Users = require('../lib/hardcode').Users,
    util = require('util');

module.exports.viewUser = function(req, res) {
  console.log(req.user);
  Users.getById(req.params["uid"], function(err, user) {
    if (err) {
      res.send(err);
    } else {
      res.send(util.inspect(user));
    }
  });
};

module.exports.viewSelf = function(req, res) {
  console.log(req.user);
  res.send(util.inspect(req.user));
};

module.exports.listUsers = function(req, res) {
  console.log(req.user);
  Users.getAll(function(err, users) {
    res.send(util.inspect(users));
  });
};
