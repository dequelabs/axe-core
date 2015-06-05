/*jshint node: true, camelcase: false */

module.exports = function (grunt) {
	'use strict';

	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-connect');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-mocha');
	grunt.loadNpmTasks('grunt-blanket-mocha');
	grunt.loadTasks('build/tasks');

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		clean: ['dist'],
		watch: {
			files: ['<%= concat.lib.src %>', 'test/**/*.js'],
			tasks: ['build', 'fixture']
		},
		concat: {
			commons: {
				src: [
					'lib/commons/index.js',
					'lib/commons/intro.stub',
					'bower_components/clone/lib/index.js',
					'bower_components/matches-selector/lib/index.js',
					'bower_components/escape-selector/lib/index.js',
					'lib/commons/*/index.js',
					'lib/commons/**/*.js',
					'lib/commons/export.js',
					'lib/commons/outro.stub'
				],
				dest: 'tmp/commons.js'
			},
			options: {
				process: true
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
		mocha: {
			commons: {
				options: {
					urls: ['http://localhost:<%= connect.test.options.port %>/test/commons/'],
					reporter: 'XUnit',
					threshold: 90
				},
				dest: 'xunit.xml'
			}
		},
		blanket_mocha: {
			commons: {
				options: {
					urls: ['http://localhost:<%= connect.test.options.port %>/test/commons/'],
					reporter: 'Spec',
					threshold: 90
				}
			}
		},
		fixture: {
			commons: {
				src: '<%= concat.lib.src %>',
				dest: 'test/commons/index.html'
			}
		},
		jshint: {
			rules: {
				options: {
					jshintrc: true,
					reporter: grunt.option('report') ? 'checkstyle' : undefined,
					reporterOutput: grunt.option('report') ? 'lint.xml' : undefined
				},
				src: ['lib/**/*.js', 'test/**/*.js', 'Gruntfile.js', '!test/mock/**/*.js']
			}
		}
	});

	grunt.registerTask('server', ['fixture', 'connect:test:keepalive']);
	grunt.registerTask('test', ['build', 'fixture', 'connect:test', grunt.option('report') ? 'mocha' : 'blanket_mocha']);
	grunt.registerTask('build', ['concat']);
	grunt.registerTask('default', ['build']);

};
