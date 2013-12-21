'use strict';

var express = require('express'),
    auth = require('./lib/auth'),
    reactMiddleware = require('react-page-middleware'),
    Remongo = require('remongo'),
    models = require('./lib/models'),
    pages = require('./lib/pages'),
    actions = require('./lib/actions');
    //routes = require('./lib/routes');

var REACT_LOCATION = __dirname + '/node_modules/react-tools/src';
var ROOT_DIR = __dirname;

var remongo = new Remongo('ccorgs_db');
models.defineModels(remongo);

var app = express();

app.configure(function() {
  app.set('view engine', 'jade');
  app.set('views', __dirname + '/views');
  app.use(reactMiddleware.provide({
    logTiming: true,
    pageRouteRoot: ROOT_DIR,
    useSourceMaps: true,
    projectRoot: ROOT_DIR,
    ignorePaths: function(p) {
      return p.indexOf('__tests__') !== -1;
    }
  }));
  app.use(express.logger());
  app.use(express.cookieParser());
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.static('public'));
  app.use(express.session({secret: process.env.SECRET || 'lol sekret'}));
  app.use(require('./lib/ajaxify'));
  app.use(function(req, res, next) {
    req.models = remongo.models;
    next();
  });
});

auth.setUp(app);
pages.configure(app);
actions.configure(app);
//routes.define(app);
var port = process.env.PORT || 5000;
app.listen(port);

console.log('app started on port', port);
