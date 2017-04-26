/*jshint node: true */
'use strict';
var buildManual = require('../build-manual');

module.exports = function (grunt) {
  grunt.registerMultiTask('add-locale', function () {
    var options = this.options({
      rules: ['lib/rules/**/*.json'],
      checks: ['lib/checks/**/*.json'],
      tools: ['lib/tools/**/*.json'],
      style: ['lib/**/*.less'],
      misc: ['lib/misc/**/*.json'],
      blacklist: ['metadata'],
      tags: '',
      lang: 'xxx'
    });

    this.files.forEach(function (file) {
      var commons = file.src[0];

      buildManual(grunt, options, commons, function (result) {
        var out = {
          lang: options.lang,
          rules: result.rules.reduce(function (out, rule) {
            out[rule.id] = rule.metadata;
            return out;
          }, {}),
          checks: result.checks.reduce(function (out, check) {
            if (check.metadata) {
              out[check.id] = check.metadata.messages;
            }
            return out;
          }, {}),
          failureSummaries: result.misc.reduce(function (out, misc) {
            out[misc.type] = misc.metadata;
            return out;
          }, {})
        };

        grunt.file.write(file.dest, JSON.stringify(out, null, '  '));
        console.log('created file at', file.dest);
      });
    });
  });
};