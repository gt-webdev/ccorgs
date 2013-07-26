'use strict';

module.exports = {
  src: {
    options: {
      jshintrc: './.jshintrc'
    },
    files: {
      src: ['./index.js', './lib/*.js', './routes/*.js', './public/js/*.js']
    }
  },
  project: {
    options: {
      jshintrc: './.jshintrc'
    },
    files: {
      src: ['./Gruntfile.js', './grunt/**/*.js']
    }
  }
};
