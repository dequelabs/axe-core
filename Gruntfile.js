/*jshint node: true, camelcase: false */

module.exports = function (grunt) {
	'use strict';

	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-jasmine');
	grunt.loadNpmTasks('grunt-contrib-qunit');
	grunt.loadNpmTasks('grunt-contrib-connect');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-mocha');
	grunt.loadNpmTasks('grunt-curl');
	grunt.loadTasks('build/tasks');
	

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

		concat: {
			test: {
				src: ['bower_components/rule-engine/dist/dqre.js',
					'bower_components/ks-common-functions/dist/ks-cf.js',
					'bower_components/ks-rules/dist/rules.js'],
				dest: 'dist/kensington.js'
			}
		},
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
				src: ['<%= concat.test.dest %>'],
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
			integration: {
				options: {
					urls: ['http://localhost:9876/test/integration/rules'],
					reporter: 'XUnit',
					timeout: 10000,
					threshold: 90
				},
				dest: 'xunit.xml'
			}
		},
				curl: {
			'doc/examples/selenium/selenium-server-standalone-2.41.0.jar': 'http://selenium-release.storage.googleapis.com/2.41/selenium-server-standalone-2.41.0.jar'
		},
		fixture: {
			checks: {
				src: '<%= concat.test.dest %>',
				dest: 'test/integration/rules/index.html',
				options: {
					fixture: 'test/integration/rules/runner.tmpl',
					testCwd: 'test/integration/rules'
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

	grunt.registerTask('default', ['concat', 'sample']);
	grunt.registerTask('sample', ['jasmine', 'mocha:test', 'qunit']);
	grunt.registerTask('test', ['concat', 'fixture', 'connect:test', 'mocha:integration']);
};
