/*jshint node: true, camelcase: false */

module.exports = function (grunt) {
	'use strict';

	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-connect');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-curl');
	grunt.loadNpmTasks('grunt-if-missing');
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
		uglify: {
			lib: {
				files: [{
					src: ['<%= concat.kensington.dest %>'],
					dest: 'dist/kensington.min.js'
				}]
			}
		},
		copy: {
			docs: {
				src: ['doc/**/*'],
				dest: 'dist/'
			},
			descriptions: {
				src: ['*.html'],
				expand: true,
				cwd: 'bower_components/ks-rules/dist/',
				dest: 'dist/doc/'
			}
		},
		watch: {
			files: ['<%= concat.kensington.src %>', '<%= testconfig.test.src %>', '<%= copy.docs.src %>'],
			tasks: ['build']
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
				dest: 'build/selenium-server-standalone-2.41.0.jar',
				src: 'http://selenium-release.storage.googleapis.com/2.41/selenium-server-standalone-2.41.0.jar'
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
	grunt.registerTask('build', ['concat', 'copy', 'uglify']);
	grunt.registerTask('test', ['build', 'if-missing:curl', 'testconfig', 'connect', 'mochaTest']);
};
