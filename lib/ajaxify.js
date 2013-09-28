'use strict';

module.exports = function(req, res, next) {
  if (req.query['format'] === 'json') {
    req.ajaxify = true;
  } else {
    req.ajaxify = false;
  }
  res.renderWithAjax = function(viewName, viewData) {
    if (req.ajaxify) {
      res.send(JSON.stringify({
        jsView: viewName,
        pageData: viewData
      }));
    } else {
      res.render('index', {
        loadPage: true,
        jsView: viewName,
        pageData: viewData
      });
    }
  };
  next();
};
