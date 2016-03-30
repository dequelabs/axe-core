//jshint maxcomplexity: 12, maxstatements: false, camelcase: false
var testConfig = require('./build/test/config');
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
	grunt.loadTasks('build/tasks');

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		clean: ['tmp'],
		'update-help': {
			options: {
				version: '<%=pkg.version%>'
			},
			rules: {
				src: ['lib/rules/**/*.json']
			}
		},
		concat: {
			engine: {
				src: [
					'lib/intro.stub',
					'lib/core/index.js',
					'lib/core/*/index.js',
					'lib/core/**/index.js',
					'lib/core/**/*.js',
					'lib/core/export.js',
					'<%= configure.rules.dest.auto %>',
					'lib/outro.stub'
				],
				dest: 'axe.js',
				options: {
					process: true
				}
			},
			commons: {
				src: [
					'lib/commons/intro.stub',
					'lib/commons/index.js',
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
		langs : {
			generate: {
				check: 'lib/checks/language/valid-lang'
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
			beautify: {
				files: [{
					src: ['<%= concat.engine.dest %>'],
					dest: '<%= concat.engine.dest %>'
				}],
				options: {
					mangle: false,
					compress: false,
					beautify: {
						beautify: true,
						indent_level: 2,
						bracketize: true,
						quote_style: 1
					},
					preserveComments: 'some'
				}
			},
			lib: {
				files: [{
					src: ['<%= concat.engine.dest %>'],
					dest: 'axe.min.js'
				}],
				options: {
					preserveComments: 'some',
					mangle: {
						except: ['commons', 'utils', 'axe']
					}
				}
			}
		},
		watch: {
			files: ['lib/**/*', 'test/**/*.js', 'Gruntfile.js'],
			tasks: ['build', 'testconfig', 'fixture']
		},
		testconfig: {
			test: {
				src: ['test/integration/rules/**/*.json'],
				dest: 'tmp/integration-tests.js'
			}
		},
		fixture: {
			engine: {
				src: '<%= concat.engine.src %>',
				dest: 'test/core/index.html',
				options: {
					fixture: 'test/runner.tmpl',
					testCwd: 'test/core',
					data: {
						title: 'aXe Core Tests'
					}
				}
			},
			checks: {
				src: [
					'<%= concat.engine.dest %>',
					'build/test/engine.js',
					'<%= configure.rules.dest.auto %>'
				],
				dest: 'test/checks/index.html',
				options: {
					fixture: 'test/runner.tmpl',
					testCwd: 'test/checks',
					data: {
						title: 'aXe Check Tests'
					}
				}
			},
			commons: {
				src: [
					'<%= concat.engine.dest %>',
					'build/test/engine.js',
					'<%= configure.rules.dest.auto %>'
				],
				dest: 'test/commons/index.html',
				options: {
					fixture: 'test/runner.tmpl',
					testCwd: 'test/commons',
					data: {
						title: 'aXe Commons Tests'
					}
				}
			},
			integration: {
				src: ['<%= concat.engine.dest %>'],
				dest: 'test/integration/rules/index.html',
				options: {
					fixture: 'test/runner.tmpl',
					testCwd: 'test/integration/rules',
					tests: ['../../../tmp/integration-tests.js', 'runner.js'],
					data: {
						title: 'aXe Integration Tests'
					}
				}
			}
		},
		mocha: testConfig(grunt),
		'test-webdriver': testConfig(grunt, {
			browser: grunt.option('browser') || 'firefox'
		}),
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

	grunt.registerTask('build', ['clean', 'validate', 'concat:commons', 'configure',
		'concat:engine', 'uglify']);

	grunt.registerTask('test', ['build',  'testconfig', 'fixture', 'connect',
		'mocha', 'jshint']);

	grunt.registerTask('test-browser', ['build',  'testconfig', 'fixture', 'connect',
		'test-webdriver', 'jshint']);
};
