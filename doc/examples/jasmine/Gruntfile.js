module.exports = function (grunt) {
	'use strict';

	grunt.loadNpmTasks('grunt-contrib-jasmine');

	grunt.initConfig({
		jasmine: {
			test: {
				src: ['../../../kensington.min.js'],
				options: {
					specs: 'spec/**/*.js'
				}
			}
		}
	});
};