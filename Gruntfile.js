//jshint maxcomplexity: 12, maxstatements: false, camelcase: false
var testConfig = require('./build/test/config');
module.exports = function (grunt) {
	'use strict';

	grunt.loadNpmTasks('grunt-babel');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-connect');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-mocha');
	grunt.loadTasks('build/tasks');
	grunt.loadNpmTasks('grunt-parallel');

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
	    parallel: {
	    	'browser-test': {
	      		options: {
	        		grunt: true
	      		},
	      		tasks: [
	      			'mocha',
	      			'test-webdriver:firefox',
			      	'test-webdriver:chrome',
			      	'test-webdriver:ie',
			      	'test-webdriver:safari'
			      	// 'test-webdriver:edge'
	      		]
	    	}
    	},
		clean: ['dist', 'tmp'],
		babel: {
			core: {
                files: [{
                    expand: true,
                    cwd: 'lib/core',
                    src: ['**/*.js'],
                    dest: 'tmp/core'
                }]
			},
			misc: {
				files: [{
                    expand: true,
                    cwd: 'tmp',
                    src: ['*.js'],
                    dest: 'tmp'
                }]
			}
		},
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
					'tmp/core/index.js',
					'tmp/core/*/index.js',
					'tmp/core/**/index.js',
					'tmp/core/**/*.js',
					'tmp/core/export.js',
					// include rules / checks / commons
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
					src: ['./axe.js'],
					dest: './axe.js'
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
			minify: {
				files: [{
					src: ['<%= concat.engine.dest %>'],
					dest: './axe.min.js'
				}],
				options: {
					preserveComments: 'some',
					mangle: {
						except: ['commons', 'utils', 'axe', 'window', 'document']
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
		mocha: testConfig(grunt, {
			reporter: grunt.option('reporter') || 'Spec'
		}),
		'test-webdriver': (function () {
			var tests = testConfig(grunt);
			var options = Object.assign({}, tests.unit.options);
			options.urls = options.urls.concat(tests.integration.options.urls);
			var driverTests = {};

			['firefox', 'chrome', 'ie', 'safari', 'edge']
			.forEach(function (browser) {
				driverTests[browser] = {
					options: Object.assign({ browser: browser }, options)
				};
			});
			return driverTests;
		}()),
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
		 'babel', 'concat:engine', 'uglify']);

	grunt.registerTask('test', ['build', 'testconfig', 'fixture', 'connect',
		'mocha', 'jshint']);

	grunt.registerTask('test-all', ['build',  'testconfig', 'fixture', 'connect',
		'mocha', 'test-webdriver', 'jshint']);

	grunt.registerTask('dev', ['build', 'testconfig', 'connect', 'watch']);
};
