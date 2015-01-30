/*jshint node: true */
'use strict';
var buildRules = require('../build-manual');
module.exports = function (grunt) {
  grunt.registerMultiTask('manual', function () {

    var options = this.options({
      rules: ['lib/rules/**/*.json'],
      checks: ['lib/checks/**/*.json'],
      tools: ['lib/tools/**/*.json'],
      classifiers: ['lib/classifiers/**/*.json'],
      analyzers: ['lib/analyzers/**/*.json'],
      version: 'dev'
    });
    var compiledStuff = buildRules(grunt, options);
    grunt.file.write(this.data.dest, 'module.exports = ' + JSON.stringify(compiledStuff) + ';');
  });
};
