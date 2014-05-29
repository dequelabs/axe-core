/*jshint node: true, camelcase: false */

module.exports = function (grunt) {
	'use strict';

	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-connect');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-blanket-mocha');
	grunt.loadNpmTasks('grunt-mocha');
	grunt.loadTasks('build/tasks');

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		clean: ["dist"],
		watch: {
			files: ['<%= concat.lib.src %>', 'test/**/*'],
			tasks: ['fixture', 'build']
		},
		concat: {
			lib: {
				src: [
					'lib/intro.stub',
					'bower_components/node-uuid/uuid.js',
					'lib/index.js',
					'lib/*/index.js',
					'lib/**/*.js',
					'lib/export.js',
					'lib/outro.stub'
				],
				dest: 'dist/dqre.js'
			},
			options: {
				process: true
			}
		},
		uglify: {
			lib: {
				files: [{
					src: ['<%= concat.lib.dest %>'],
					dest: 'dist/dqre.min.js'
				}]
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
		fixture: {
			unit: {
				src: '<%= concat.lib.src %>',
				dest: 'test/unit/index.html',
				options: {
					fixture: 'test/unit/runner.tmpl',
					testCwd: 'test/unit'
				}
			},
			integration: {
				src: '<%= concat.lib.dest %>',
				dest: 'test/integration/index.html',
				options: {
					fixture: 'test/integration/runner.tmpl',
					testCwd: 'test/integration'
				}
			}
		},
		mocha: {
			test: {
				options: {
					urls: ['http://localhost:9876/test/unit/index.html'],
					reporter: grunt.option('report') ? 'XUnit' : 'Spec',
					logErrors: true,
					log: true
				},
				dest: grunt.option('report') ? 'xunit.xml' : undefined
			}
		},
		blanket_mocha: {
			test: {
				options: {
					urls: ['http://localhost:9876/test/unit/index.html'],
					reporter: 'Spec',
					threshold: 90
				}
			}
		},
		jshint: {
			rules: {
				options: {
					jshintrc: true,
					reporter: grunt.option('report') ? require('jshint-junit-reporter') : undefined,
					reporterOutput: grunt.option('report') ? 'lint.xml' : undefined
				},
				src: ['lib/**/*.js', 'test/**/*.js', 'Gruntfile.js', '!test/mock/**/*.js']
			}
		}
	});

	grunt.registerTask('server', ['fixture', 'connect:test:keepalive']);
	grunt.registerTask('test', ['build', 'fixture', 'connect:test', grunt.option('report') ? 'mocha' : 'blanket_mocha']);
	grunt.registerTask('build', ['concat', 'uglify']);
	grunt.registerTask('default', ['build']);
};
