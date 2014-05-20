/*jshint node: true, camelcase: false */

module.exports = function (grunt) {
	'use strict';

	grunt.loadTasks('build/tasks');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-jasmine');
	grunt.loadNpmTasks('grunt-contrib-qunit');
	grunt.loadNpmTasks('grunt-contrib-connect');

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

		watch: {
			files: ['bower_components/rule-engine/dist/dqre.js', 'test/**/*'],
			tasks: ['jasmine:test:build']
		},
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
		qunit: {
			all: ['test/examples/qunit/**/*.html']
		},
		jasmine: {
			test: {
				src: ['bower_components/rule-engine/dist/dqre.js',
					'bower_components/ks-rules/dist/rules.full.js'],
				options: {
					specs: 'test/examples/jasmine/*spec.js'
				}
			}
		},
		connect: {
			test: {
				options: {
					hostname: '0.0.0.0',
					port: 9876,
					base: ['.']
				}
			}
		},
	});

	grunt.registerTask('build', ['npminstall', 'rungrunt']);
	grunt.registerTask('default', ['build']);
	grunt.registerTask('sample', ['jasmine']);
};
