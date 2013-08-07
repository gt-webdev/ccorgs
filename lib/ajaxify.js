'use strict';

module.exports = function(req, res, next) {
  if (req.query['format'] === 'json') {
    req.ajaxify = true;
  } else {
    req.ajaxify = false;
  }
  next();
};
