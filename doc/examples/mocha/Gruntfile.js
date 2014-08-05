module.exports = function (grunt) {
	'use strict';

	grunt.loadNpmTasks('grunt-mocha');

	grunt.initConfig({
		mocha: {
			test: {
				src: ['test/**/*.html'],
				options: {
					run: true
				}
			}
		}
	});
};