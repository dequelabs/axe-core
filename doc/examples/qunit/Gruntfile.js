module.exports = function (grunt) {
	'use strict';

	grunt.loadNpmTasks('grunt-contrib-qunit');

	grunt.initConfig({
		qunit: {
			all: ['test/**/*.html']
		}
	});
};