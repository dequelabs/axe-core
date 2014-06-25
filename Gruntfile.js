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
	grunt.loadNpmTasks('grunt-mocha-test');
	grunt.loadTasks('build/tasks');


	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

		concat: {
			kensington: {
				src: ['bower_components/rule-engine/dist/dqre.js',
					'bower_components/ks-common-functions/dist/ks-cf.js',
					'bower_components/ks-rules/dist/rules.js'],
					dest: 'dist/kensington.js'
			}
		},
		watch: {
			files: ['<%= concat.test.src %>', '<%= testconfig.test.src %>'],
			tasks: ['concat', 'testconfig']
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
		},
		mochaTest: {
			test: {
				options: {
					reporter: grunt.option('report') ? 'XUnit' : 'spec',
					captureFile: grunt.option('report') ? 'dist/xunit.xml' : undefined
				},
				src: ['test/integration/testrunner.js']
			}
		},
		testconfig: {
			test: {
				src: ['test/integration/rules/**/*.json'],
				dest: 'build/test.json',
				options: {
					port: '<%= connect.test.options.port %>'
				}
			}
		},
		curl: {
			'build/selenium-server-standalone-2.41.0.jar': 'http://selenium-release.storage.googleapis.com/2.41/selenium-server-standalone-2.41.0.jar'
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

	grunt.registerTask('sample', ['jasmine', 'mocha', 'qunit']);
	grunt.registerTask('default', ['build']);
	grunt.registerTask('build', ['concat']);
	grunt.registerTask('test', ['build', 'testconfig', 'connect', 'mochaTest']);
};
