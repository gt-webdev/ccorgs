'use strict';

var grunt = require("grunt");

module.exports = {
  run: {
    port: 8080,
    harness: "test/test_harness.js",
    // Run `grunt test --debug` to enable in-browser testing.
    debug: !!grunt.option("debug"),
    tests: [
      "**/__tests__/*-test.js"
    ]
  }
};
