'use strict';

var zombieTask = require('./grunt/tasks/zombie');
var zombieConf = require('./grunt/config/zombie');

module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    zombie: zombieConf,
    jshint: require('./grunt/config/jshint')
  });

  grunt.loadNpmTasks('grunt-contrib-jshint');

  grunt.registerMultiTask('zombie', zombieTask);
  grunt.registerTask('lint', ['jshint']);
  grunt.registerTask('test', ['zombie:run']);

  grunt.registerTask('default', ['lint']);
};
