/*jshint node: true */
'use strict';
var buildRules = require('../build-manual');
module.exports = function (grunt) {
  grunt.registerMultiTask('manual', function () {
    var done = this.async();
    var options = this.options({
      rules: ['lib/rules/**/*.json'],
      checks: ['lib/checks/**/*.json'],
      tools: ['lib/tools/**/*.json'],
      style: ['lib/**/*.less'],
      classifiers: ['lib/classifiers/**/*.json'],
      analyzers: ['lib/analyzers/**/*.json'],
      misc: ['lib/misc/**/*.json'],
      version: 'dev'
    });
    var that = this;
    buildRules(grunt, options, function (result) {
      grunt.file.write(that.data.dest, 'module.exports = ' + JSON.stringify(result, null, '  ') + ';');
      done();
    });

  });
};
