/*jshint node: true, camelcase: false */

module.exports = function (grunt) {
	'use strict';

	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-jasmine');
	grunt.loadNpmTasks('grunt-contrib-qunit');
	grunt.loadNpmTasks('grunt-contrib-connect');
	grunt.loadNpmTasks('grunt-mocha');
	grunt.loadNpmTasks('grunt-curl');
	

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
			all: ['doc/examples/qunit/**/*.html']
		},
		jasmine: {
			test: {
				src: ['doc/examples/felib.js',
					'bower_components/rule-engine/dist/dqre.js',
					'bower_components/ks-rules/dist/rules.full.js'],
				options: {
					specs: 'doc/examples/jasmine/*spec.js'
				}
			}
		},
		mocha: {
			test: {
				src: ['doc/examples/mocha/**/*.html'],
				options: {
					run: true
				},
			},
		},
				curl: {
			'doc/examples/selenium/selenium-server-standalone-2.41.0.jar': 'http://selenium-release.storage.googleapis.com/2.41/selenium-server-standalone-2.41.0.jar'
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

	grunt.registerTask('default', ['sample']);
	grunt.registerTask('sample', ['jasmine', 'mocha', 'qunit']);
};
