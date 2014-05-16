/*jshint node: true, camelcase: false */


module.exports = function (grunt) {
	'use strict';

	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-connect');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-blanket-mocha');
	grunt.loadTasks('build/tasks');

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

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
		blanket_mocha: {
			source: {
				options: {
					urls: [
						'http://localhost:9876/test/unit'
					],
					reporter: grunt.option("reporter") || (process.env.XUNIT_FILE ? 'xunit-file' : 'Spec'),
					timeout: 10000,
					threshold: 90
				}
			}
		}
	});

	grunt.registerTask('server', ['fixture', 'connect:test:keepalive']);
	grunt.registerTask('test', ['fixture', 'connect:test', 'blanket_mocha']);
	grunt.registerTask('build', ['concat', 'uglify']);
	grunt.registerTask('default', ['build']);
};