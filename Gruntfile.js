/*jshint node: true, camelcase: false */


module.exports = function (grunt) {
	'use strict';

	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-connect');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-blanket-mocha');
	grunt.loadNpmTasks('grunt-mocha');
	grunt.loadTasks('build/tasks');

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		clean: ["dist"],
		watch: {
			files: ['test/**/*', 'lib/**/*'],
			tasks: ['fixture', 'build']
		},
		rules: {
			lib: {
				dest: {
					rules: 'dist/rules.js',
					checks: 'dist/checks.js'
				}
			}
		},
		uglify: {
			minify: {
				files: [{
					src: ['<%= rules.lib.dest.rules %>'],
					dest: 'dist/rules.min.js'
				}, {
					src: ['<%= rules.lib.dest.checks %>'],
					dest: 'dist/checks.min.js'
				}]
			},
			beautify: {
				files: [{
					src: ['<%= rules.lib.dest.rules %>'],
					dest: '<%= rules.lib.dest.rules %>'
				}, {
					src: ['<%= rules.lib.dest.checks %>'],
					dest: '<%= rules.lib.dest.checks %>'
				}],
				options: {
					mangle: false,
					compress: false,
					beautify: true
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
		fixture: {
			checks: {
				src: '<%= rules.lib.dest.checks %>',
				dest: 'test/checks/index.html',
				options: {
					fixture: 'test/checks/runner.tmpl',
					testCwd: 'test/checks'
				}
			}
		},
		mocha: {
			test: {
				options: {
					urls: ['http://localhost:9876/test/checks'],
					reporter: 'XUnit',
					timeout: 10000,
					threshold: 90
				},
				dest: 'xunit.xml'
			}
		},
		blanket_mocha: {
			test: {
				options: {
					urls: ['http://localhost:9876/test/checks'],
					reporter: 'Spec',
					timeout: 10000,
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
	grunt.registerTask('test', ['build', 'fixture', 'connect:test', 'mocha']);
	grunt.registerTask('build', ['rules', 'uglify']);
	grunt.registerTask('default', ['build']);

};
