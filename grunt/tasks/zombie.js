'use strict';

var grunt = require("grunt");
var spawn = grunt.util.spawn;

function run(config, done) {
  var args = [];

  if (config.debug) {
    args.push("--debug");
  }

  var child = spawn({
    cmd: 'mocha',
    args: args
  }, done);

  child.stdout.pipe(process.stdout);
  child.stderr.pipe(process.stderr);
}

module.exports = function() {
  var config = this.data;
  var done = this.async();

  run(config, done);
};
