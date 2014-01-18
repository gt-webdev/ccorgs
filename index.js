'use strict';

var express = require('express'),
    react_view = require('react-view'),
    auth = require('./lib/auth'),
    Remongo = require('remongo'),
    models = require('./lib/models'),
    pages = require('./lib/pages'),
    actions = require('./lib/actions');


var remongo = new Remongo('ccorgs_db');
models.defineModels(remongo);

var app = express();

app.configure(function() {
  app.set('view engine', 'js');
  app.engine('js', react_view.__express);
  app.set('views', __dirname + '/public');
  app.use(express.logger());
  app.use(express.cookieParser());
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.static('public'));
  app.use(express.session({secret: process.env.SECRET || 'lol sekret'}));
  app.use(function(req, res, next) {
    req.models = remongo.models;
    next();
  });
  auth.setUp(app);
  react_view.configRoutes(app);
  pages.configure(app);
  actions.configure(app);
});


var port = process.env.PORT || 5000;
app.listen(port);

console.log('app started on port', port);
