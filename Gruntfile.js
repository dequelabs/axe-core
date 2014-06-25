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


	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

		concat: {
			kensington: {
				src: ['bower_components/rule-engine/dist/dqre.js',
					'bower_components/ks-common-functions/dist/ks-cf.js',
					'bower_components/ks-rules/dist/rules.js'],
					dest: 'dist/kensington.js'
			},
			json: {
				src: ['test/integration/rules/*.json'],
				options: {
					separator: ',',
				},
				dest: 'test/integration/rules/json.tmpl'
			},
			integration: {
				src: ['test/integration/rules/header.tmpl', 'test/integration/rules/json.tmpl',
					'test/integration/rules/footer.tmpl'],
				dest: 'test/integration/rules/test.js'
			}
		},
		watch: {
			files: ['<%= concat.test.src %>'],
			tasks: ['concat']
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
					reporter: 'spec'
				},
				src: ['test/integration/rules/test.js']
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

	grunt.registerTask('default', ['concat:kensington', 'sample']);
	grunt.registerTask('sample', ['jasmine', 'mocha', 'qunit']);
	grunt.registerTask('test', ['concat:kensington', 'concat:json', 'concat:integration', 'connect', 'mochaTest']);
};
