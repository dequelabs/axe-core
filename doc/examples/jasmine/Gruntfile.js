module.exports = function (grunt) {
	'use strict';

	grunt.loadNpmTasks('grunt-contrib-jasmine');

	grunt.initConfig({
		jasmine: {
			test: {
				src: ['../../../axe.min.js'],
				options: {
					specs: 'spec/**/*.js'
				}
			}
		}
	});
};