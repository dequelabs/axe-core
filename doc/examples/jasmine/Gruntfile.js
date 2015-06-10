module.exports = function (grunt) {
	'use strict';

	grunt.loadNpmTasks('grunt-contrib-jasmine');

	grunt.initConfig({
		jasmine: {
			test: {
				src: ['node_modules/axe-core/axe.js'],
				options: {
					specs: 'spec/**/*.js'
				}
			}
		}
	});
};
