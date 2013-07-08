module.exports.requires_login = function(req, res, next) {
  next();
};

module.exports.requires_admin = function(req, res, next) {
  next();
};
