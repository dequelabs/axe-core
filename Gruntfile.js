/*jshint node: true, camelcase: false, maxstatements: false */

module.exports = function (grunt) {
	'use strict';

	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-connect');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-curl');
	grunt.loadNpmTasks('grunt-mocha');
	grunt.loadNpmTasks('grunt-if-missing');
	grunt.loadNpmTasks('grunt-mocha-test');
	grunt.loadTasks('build/tasks');

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		clean: ['dist'],
		concat: {
			engine: {
				src: ['lib/intro.stub',
					'bower_components/clone/lib/index.js',
					'bower_components/matches-selector/lib/index.js',
					'bower_components/escape-selector/lib/index.js',
					'bower_components/node-uuid/uuid.js',
					'lib/index.js',
					'lib/*/index.js',
					'lib/**/index.js',
					'lib/**/*.js',
					'bower_components/axe-rules/dist/axe-rules.js',
					'lib/export.js',
					'lib/outro.stub'
				],
				dest: 'dist/axe.js',
				options: {
					process: true
				}
			}
		},
		uglify: {
			lib: {
				files: [{
					src: ['<%= concat.engine.dest %>'],
					dest: 'dist/axe.min.js'
				}]
			}
		},
		watch: {
			files: ['<%= concat.engine.src %>', '<%= testconfig.test.src %>'],
			tasks: ['build']
		},
		fixture: {
			unit: {
				src: '<%= concat.engine.src %>',
				dest: 'test/unit/index.html',
				options: {
					fixture: 'test/unit/runner.tmpl',
					testCwd: 'test/unit'
				}
			}
		},
		mocha: {
			test: {
				options: {
					urls: ['http://localhost:<%= connect.test.options.port %>/test/unit/index.html'],
					reporter: grunt.option('report') ? 'XUnit' : 'Spec',
					run: true,
					logErrors: true,
					log: true
				},
				dest: grunt.option('report') ? 'xunit.xml' : undefined
			}
		},
		mochaTest: {
			test: {
				options: {
					reporter: grunt.option('report') ? 'xunit' : 'spec',
					captureFile: grunt.option('report') ? 'dist/xunit.xml' : undefined,
					grep: grunt.option('grep')
				},
				src: ['test/integration/testrunner.js']
			}
		},
		testconfig: {
			test: {
				src: ['test/integration/rules/**/*.json'],
				dest: 'build/test.json',
				options: {
					port: '<%= connect.test.options.port %>',
					seleniumServer: grunt.option('selenium')
				}
			}
		},
		curl: {
			selenium: {
				dest: 'build/selenium-server-standalone-2.45.0.jar',
				src: 'http://selenium-release.storage.googleapis.com/2.45/selenium-server-standalone-2.45.0.jar'
			}
		},
		connect: {
			test: {
				options: {
					hostname: '0.0.0.0',
					port: grunt.option('port') || 9876,
					base: ['.']
				}
			}
		},
		jshint: {
			rules: {
				options: {
					jshintrc: true,
					reporter: grunt.option('report') ? 'checkstyle' : undefined,
					reporterOutput: grunt.option('report') ? 'lint.xml' : undefined
				},
				src: ['test/**/*.js', 'build/tasks/**/*.js', 'doc/**/*.js', 'Gruntfile.js']
			}
		}
	});

	grunt.registerTask('default', ['build']);
	grunt.registerTask('build', ['concat', 'uglify']);
	grunt.registerTask('test', ['build', 'fixture', 'connect', 'if-missing:curl', 'testconfig', 'mocha', 'mochaTest']);
};
