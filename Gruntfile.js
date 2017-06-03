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
	grunt.loadNpmTasks('grunt-retire');
	grunt.loadNpmTasks('grunt-mocha');
	grunt.loadTasks('build/tasks');
	grunt.loadNpmTasks('grunt-parallel');

	var langs;
	if (grunt.option('lang')) {
		langs = (grunt.option('lang') || '')
		.split(/[,;]/g).map(function (lang) {
			lang = lang.trim();
			return (lang !== 'en' ? '.' + lang : '');
		});

	} else if (grunt.option('all-lang')) {
		var localeFiles = require('fs').readdirSync('./locales');
		langs = localeFiles.map(function (file) {
			return '.' + file.replace('.json', '');
		});
		langs.unshift(''); // Add default

	} else {
		langs = [''];
	}

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		parallel: {
			'browser-test': {
				options: {
					grunt: true
				},
				tasks: [
					'test-webdriver:firefox',
					'test-webdriver:chrome',
					// Edge Webdriver isn't all too stable, manual testing required
					// 'test-webdriver:edge',
					// 'test-webdriver:safari',
					'test-webdriver:ie',
					'test-webdriver:chrome-mobile'
				]
			}
		},
    retire: {
			options: {
				/** list of files to ignore **/
				ignorefile: '.retireignore.json' //or '.retireignore.json'
			},
			js: ['lib/*.js'], /** Which js-files to scan. **/
			node: ['./'] /** Which node directories to scan (containing package.json). **/
    },
		clean: ['dist', 'tmp', 'axe.js', 'axe.*.js'],
		babel: {
			options: {
				compact: 'false'
			},
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
				coreFiles: [
					'tmp/core/index.js',
					'tmp/core/*/index.js',
					'tmp/core/**/index.js',
					'tmp/core/**/*.js'
				],
				options: {
					process: true
				},
				files: langs.map(function (lang, i) {
					return {
						src: [
							'lib/intro.stub',
							'<%= concat.engine.coreFiles %>',
							// include rules / checks / commons
							'<%= configure.rules.files[' + i + '].dest.auto %>',
							'lib/outro.stub'
						],
						dest: 'axe' + lang + '.js',
					};
				})
			},
			commons: {
				src: [
					'lib/commons/intro.stub',
					'lib/commons/index.js',
					'lib/commons/*/index.js',
					'lib/commons/**/*.js',
					'lib/commons/outro.stub'
				],
				dest: 'tmp/commons.js'
			}
		},
		configure: {
			rules: {
				tmp: 'tmp/rules.js',
				options: {
					tags: grunt.option('tags')
				},
				files: langs.map(function (lang) {
					return {
						src: ['<%= concat.commons.dest %>'],
						dest: {
							auto: 'tmp/rules' + lang + '.js',
							descriptions: 'doc/rule-descriptions' + lang + '.md'
						}
					};
				})
			}
		},
		'add-locale': {
			newLang: {
				options: { lang: grunt.option('lang') },
				src: ['<%= concat.commons.dest %>'],
				dest: './locales/' + (grunt.option('lang') || 'new-locale') + '.json'
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
				files: langs.map(function (lang, i) {
					return {
						src: ['<%= concat.engine.files[' + i + '].dest %>'],
						dest: '<%= concat.engine.files[' + i + '].dest %>'
					};
				}),
				options: {
					mangle: false,
					compress: false,
					beautify: {
						beautify: true,
						indent_level: 2,
						bracketize: true,
						quote_style: 1
					},
					preserveComments: /^!/
				}
			},
			minify: {
				files: langs.map(function (lang, i) {
					return {
						src: ['<%= concat.engine.files[' + i + '].dest %>'],
						dest: './axe' + lang + '.min.js'
					};
				}),
				options: {
					preserveComments: function(node, comment) {
						// preserve comments that start with a bang
						return /^!/.test( comment.value );
					},
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
				src: ['<%= concat.engine.coreFiles %>'],
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
					'<%= concat.engine.files[0].dest %>',
					'build/test/engine.js',
					'<%= configure.rules.tmp %>'
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
					'<%= concat.engine.files[0].dest %>',
					'build/test/engine.js',
					'<%= configure.rules.tmp %>'
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
			ruleMatches: {
				src: [
					'<%= concat.engine.files[0].dest %>',
					'build/test/engine.js',
					'<%= configure.rules.tmp %>'
				],
				dest: 'test/rule-matches/index.html',
				options: {
					fixture: 'test/runner.tmpl',
					testCwd: 'test/rule-matches',
					data: {
						title: 'aXe Rule Matches Tests'
					}
				}
			},
			integration: {
				src: ['<%= concat.engine.files[0].dest %>'],
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

			['firefox', 'chrome', 'ie', 'safari', 'edge', 'chrome-mobile']
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

	grunt.registerTask('build', ['clean', 'jshint', 'validate', 'concat:commons', 'configure',
		 'babel', 'concat:engine', 'uglify']);

	grunt.registerTask('test', ['build', 'retire', 'testconfig', 'fixture', 'connect',
		'mocha', 'parallel', 'jshint']);

	grunt.registerTask('ci-build', ['build', 'retire', 'testconfig', 'fixture', 'connect',
	 'parallel', 'jshint']);

	grunt.registerTask('test-fast', ['build', 'testconfig', 'fixture', 'connect',
		'mocha', 'jshint']);

	grunt.registerTask('translate', ['clean', 'jshint', 'validate', 'concat:commons', 'add-locale']);

	grunt.registerTask('dev', ['build', 'testconfig', 'fixture', 'connect', 'watch']);

	grunt.registerTask('dev:no-lint', ['clean', 'validate', 'concat:commons', 'configure',
		 'babel', 'concat:engine', 'uglify', 'testconfig', 'fixture', 'connect', 'watch']);
};
