'use strict';

var express = require('express'),
    auth = require('./lib/auth'),
    Remongo = require('remongo'),
    models = require('./lib/models'),
    routes = require('./lib/routes');

var remongo = new Remongo('ccorgs_db');
models.defineModels(remongo);

var app = express();

app.configure(function() {
  app.set('view engine', 'jade');
  app.set('views', __dirname + '/views');
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
routes.define(app);
var port = process.env.PORT || 5000;
app.listen(port);

console.log('app started on port', port);
