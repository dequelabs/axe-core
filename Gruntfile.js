/*jshint node: true, camelcase: false */

module.exports = function (grunt) {
	'use strict';

	grunt.loadTasks('build/tasks');

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

		npminstall: {
			'rule-engine': {
				src: 'bower_components/rule-engine/'
			},
			'ks-rules': {
				src: 'bower_components/ks-rules/'
			}
		},
		rungrunt: {
			'rule-engine': {
				src: 'bower_components/rule-engine/'
			},
			'ks-rules': {
				src: 'bower_components/ks-rules/'
			}
		},
	});

	grunt.registerTask('build', ['npminstall', 'rungrunt']);
	grunt.registerTask('default', ['build']);
};
