/*jshint node: true */
'use strict';
var buildRules = require('../configure');
module.exports = function (grunt) {
	grunt.registerMultiTask('configure', function () {

		var done = this.async();
		var options = this.options({
      rules: ['lib/rules/**/*.json'],
      checks: ['lib/checks/**/*.json'],
      tools: ['lib/tools/**/*.json'],
      style: ['lib/**/*.less'],
      misc: ['lib/misc/**/*.json'],
			blacklist: ['metadata'],
			tags: ''
		});

		this.files.forEach(function (file) {
			var commons = file.src[0];
      var match = file.dest.auto.match(/\.([a-z]{2,3})\.js/);
      if (match) {
        options.locale = match[1];
      }

			buildRules(grunt, options, commons, function (result) {
				grunt.file.write(file.dest.auto, 'axe._load(' + result.auto + ');');
				grunt.file.write(file.dest.descriptions, result.descriptions);
				done();
			});
		});
	});
};
