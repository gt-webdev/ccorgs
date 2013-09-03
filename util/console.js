// load this script with `node console.js` to have an interactive shell
// with `remongo` defined with the correct models.
var models = require('../lib/models');
var r = require('remongo');
var remongo = new r('ccorgs_db');
models.defineModels(remongo);
var myrepl = require("repl").start('ccorgs-remongo> ');
myrepl.context['remongo'] = remongo; 
