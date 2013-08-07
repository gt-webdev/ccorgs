'use strict';

var express = require("express"),
    auth = require("./lib/auth"),
    routes = require("./lib/routes");

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
  app.use(express.csrf());
  app.use(require('./lib/ajaxify'));
});

auth.setUp(app);
routes.define(app);
var port = process.env.PORT || 5000;
app.listen(port);

console.log('app started on port', port);
