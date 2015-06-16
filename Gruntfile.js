//jshint maxcomplexity: 12
module.exports = function (grunt) {
	'use strict';

	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-connect');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-mocha');
	grunt.loadNpmTasks('grunt-mocha-test');
	grunt.loadTasks('build/tasks');

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		clean: ['dist', 'tmp'],
		concat: {
			engine: {
				src: [
					'lib/intro.stub',
					'bower_components/simple-clone/lib/index.js',
					'bower_components/element-matches/lib/index.js',
					'bower_components/escape-selector/lib/index.js',
					'bower_components/node-uuid/uuid.js',
					'lib/core/index.js',
					'lib/core/*/index.js',
					'lib/core/**/index.js',
					'lib/core/**/*.js',
					'<%= configure.rules.dest.auto %>',
					'lib/core/export.js',
					'lib/outro.stub'
				],
				dest: 'dist/axe.js',
				options: {
					process: true
				}
			},
			commons: {
				src: [
					'lib/commons/intro.stub',
					'lib/commons/index.js',
					'bower_components/simple-clone/lib/index.js',
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
		configure: {
			rules: {
				src: ['<%= concat.commons.dest %>'],
				options: {
					tags: grunt.option('tags')
				},
				dest: {
					auto: 'tmp/rules.js',
					descriptions: 'doc/rule-descriptions.md'
				}
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
			lib: {
				files: [{
					src: ['<%= concat.engine.dest %>'],
					dest: 'dist/axe.min.js'
				}],
				options: {
					preserveComments: 'some'
				}
			},
			beautify: {
				files: [{
					src: ['<%= concat.engine.dest %>'],
					dest: '<%= concat.engine.dest %>'
				}],
				options: {
					mangle: false,
					compress: false,
					beautify: true,
					preserveComments: 'some'
				}
			}
		},
		copy: {
			manifests: {
				files: [{
					src: ['package.json'],
					dest: 'dist/'
				}, {
					src: ['README.md'],
					dest: 'dist/'
				}, {
					src: ['bower.json'],
					dest: 'dist/'
				}, {
					src: ['LICENSE'],
					dest: 'dist/'
				}]
			}
		},
		watch: {
			files: ['<%= concat.engine.src %>', '<%= testconfig.test.src %>'],
			tasks: ['build']
		},
		fixture: {
			engine: {
				src: '<%= concat.engine.src %>',
				dest: 'test/unit/index.html',
				options: {
					fixture: 'test/runner.tmpl',
					testCwd: 'test/unit'
				}
			},
			checks: {
				src: ['build/test/engine.js', '<%= configure.rules.dest.auto %>'],
				dest: 'test/checks/index.html',
				options: {
					fixture: 'test/runner.tmpl',
					testCwd: 'test/checks'
				}
			},
			commons: {
				src: ['build/test/engine.js', '<%= configure.rules.dest.auto %>'],
				dest: 'test/commons/index.html',
				options: {
					fixture: 'test/runner.tmpl',
					testCwd: 'test/commons'
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
				dest: grunt.option('report') ? 'tmp/xunit.xml' : undefined
			},
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
				dest: 'tmp/test.json',
				options: {
					port: '<%= connect.test.options.port %>'
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
		jshint: {
			axe: {
				options: {
					jshintrc: true,
					reporter: grunt.option('report') ? 'checkstyle' : undefined,
					reporterOutput: grunt.option('report') ? 'tmp/lint.xml' : undefined
				},
				src: ['lib/**/*.js', 'test/**/*.js', 'build/tasks/**/*.js', 'doc/**/*.js', 'Gruntfile.js']
			}
		}
	});

	grunt.registerTask('default', ['build']);
	grunt.registerTask('build', ['clean', 'validate', 'concat:commons', 'configure', 'concat:engine', 'copy', 'uglify']);
	grunt.registerTask('test', ['build', 'fixture', 'connect', 'testconfig', 'mocha', 'mochaTest', 'jshint']);
};
