/*jshint node: true, camelcase: false */
module.exports = function (grunt) {
	'use strict';

	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-connect');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-mocha');
	grunt.loadTasks('build/tasks');

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		clean: ["dist"],
		watch: {
			files: ['test/**/*', 'lib/**/*'],
			tasks: ['fixture', 'build']
		},
		configure: {
			lib: {
				src: ['<%= concat.commons.dest %>'],
				options: {
					tags: grunt.option('tags'),
					version: '<%= pkg.version %>'
				},
				dest: {
					auto: 'dist/rules.js',
					manual: 'dist/manual.js',
					test: 'dist/test.js',
					descriptions: 'dist/descriptions.html'
				}
			}
		},
		concat: {
			commons: {
				src: [
					'lib/commons/intro.stub',
					'lib/commons/index.js',
					'bower_components/clone/lib/index.js',
					'bower_components/element-matches/lib/index.js',
					'bower_components/escape-selector/lib/index.js',
					'lib/commons/*/index.js',
					'lib/commons/**/*.js',
					'lib/commons/export.js',
					'lib/commons/outro.stub'
				],
				dest: 'tmp/commons.js'
			}
		},
		validate: {
			tools: {
				options: {
					type: 'tool'
				},
				src: 'lib/tools/**/*.json'
			},
			check: {
				options: {
					type: 'check'
				},
				src: 'lib/checks/**/*.json'
			},
			rule: {
				options: {
					type: 'rule'
				},
				src: 'lib/rules/**/*.json'
			}
		},
		uglify: {
			minify: {
				files: [{
					src: ['<%= configure.lib.dest.auto %>'],
					dest: 'dist/rules.min.js'
				}, {
					src: ['<%= configure.lib.dest.manual %>'],
					dest: 'dist/manual.min.js'
				}]
			},
			beautify: {
				files: [{
					src: ['<%= configure.lib.dest.auto %>'],
					dest: '<%= configure.lib.dest.auto %>'
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
					port: grunt.option('port') || 9876,
					base: ['.']
				}
			}
		},
		fixture: {
			checks: {
				src: ['build/test/engine.js', '<%= configure.lib.dest.test %>'],
				dest: 'test/checks/index.html',
				options: {
					fixture: 'test/runner.tmpl',
					testCwd: 'test/checks'
				}
			},
			commons: {
				src: '<%= concat.commons.src %>',
				dest: 'test/commons/index.html',
				options: {
					fixture: 'test/runner.tmpl',
					testCwd: 'test/commons'
				}
			}
		},
		mocha: {
			checks: {
				options: {
					urls: ['http://localhost:<%= connect.test.options.port %>/test/checks/'],
					run: true,
					reporter: grunt.option('report') ? 'XUnit' : 'Spec'
				},
				dest: grunt.option('report') ? 'tmp/checks-xunit.xml' : undefined
			},
			commons: {
				options: {
					urls: ['http://localhost:<%= connect.test.options.port %>/test/commons/'],
					run: true,
					reporter: grunt.option('report') ? 'XUnit' : 'Spec'
				},
				dest: grunt.option('report') ? 'tmp/commons-xunit.xml' : undefined
			}
		},
		jshint: {
			all: {
				options: {
					jshintrc: true,
					reporter: grunt.option('report') ? 'checkstyle' : undefined,
					reporterOutput: grunt.option('report') ? 'tmp/lint.xml' : undefined
				},
				src: ['lib/**/*.js', 'test/**/*.js', 'Gruntfile.js', '!test/mock/**/*.js']
			}
		}
	});

	grunt.registerTask('server', ['fixture', 'connect:test:keepalive']);
	grunt.registerTask('test', ['build', 'fixture', 'connect:test', 'mocha']);
	grunt.registerTask('build', ['validate', 'concat', 'configure', 'uglify']);
	grunt.registerTask('default', ['build']);

};
