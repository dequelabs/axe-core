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
      classifiers: ['lib/classifiers/**/*.json'],
      analyzers: ['lib/analyzers/**/*.json'],
      misc: ['lib/misc/**/*.json'],
			blacklist: ['metadata'],
			version: 'dev',
			tags: ''
		});
		var that = this;
		buildRules(grunt, options, function (result) {
			grunt.file.write(that.data.dest.auto, 'dqre._load(' + result.auto + ');');
			grunt.file.write(that.data.dest.manual, 'dqre._load(' + result.manual + ');');
			grunt.file.write(that.data.dest.test, 'dqre._load(' + result.test + ');');
			grunt.file.write(that.data.dest.descriptions, result.descriptions);
			done();
		});
	});
};
