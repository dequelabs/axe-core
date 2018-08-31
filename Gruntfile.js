/*eslint 
complexity: ["error",12], 
max-statements: ["error", 35],
camelcase: ["error", {"properties": "never"}]
*/
var testConfig = require('./build/test/config');

module.exports = function(grunt) {
	'use strict';

	grunt.loadNpmTasks('grunt-babel');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-connect');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-eslint');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-retire');
	grunt.loadNpmTasks('grunt-mocha');
	grunt.loadNpmTasks('grunt-parallel');
	grunt.loadNpmTasks('grunt-markdownlint');
	grunt.loadTasks('build/tasks');

	var langs;
	if (grunt.option('lang')) {
		langs = (grunt.option('lang') || '').split(/[,;]/g).map(function(lang) {
			lang = lang.trim();
			return lang !== 'en' ? '.' + lang : '';
		});
	} else if (grunt.option('all-lang')) {
		var localeFiles = require('fs').readdirSync('./locales');
		langs = localeFiles.map(function(file) {
			return '.' + file.replace('.json', '');
		});
		langs.unshift(''); // Add default
	} else {
		langs = [''];
	}

	var webDriverTestBrowsers = ['firefox', 'chrome', 'ie', 'chrome-mobile'];

	process.env.NODE_NO_HTTP2 = 1; // to hide node warning - (node:18740) ExperimentalWarning: The http2 module is an experimental API.

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		parallel: {
			'browser-test': {
				options: {
					stream: true,
					grunt: true
				},
				tasks: webDriverTestBrowsers.map(function(b) {
					return 'test-webdriver:' + b;
				})
			}
		},
		'test-webdriver': (function() {
			var tests = testConfig(grunt);
			var options = Object.assign({}, tests.unit.options);
			options.urls = options.urls.concat(tests.integration.options.urls);
			var driverTests = {};
			webDriverTestBrowsers.forEach(function(browser) {
				driverTests[browser] = {
					options: Object.assign({ browser: browser }, options)
				};
			});
			return driverTests;
		})(),
		retire: {
			options: {
				/** list of files to ignore **/
				ignorefile: '.retireignore.json' //or '.retireignore.json'
			},
			js: ['lib/*.js'] /** Which js-files to scan. **/,
			node: [
				'./'
			] /** Which node directories to scan (containing package.json). **/
		},
		clean: ['dist', 'tmp', 'axe.js', 'axe.*.js'],
		babel: {
			options: {
				compact: 'false'
			},
			core: {
				files: [
					{
						expand: true,
						cwd: 'lib/core',
						src: ['**/*.js'],
						dest: 'tmp/core'
					}
				]
			},
			misc: {
				files: [
					{
						expand: true,
						cwd: 'tmp',
						src: ['*.js'],
						dest: 'tmp'
					}
				]
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
				options: {
					process: true
				},
				coreFiles: [
					'tmp/core/index.js',
					'tmp/core/*/index.js',
					'tmp/core/**/index.js',
					'tmp/core/**/*.js'
				],
				files: langs.map(function(lang, i) {
					return {
						src: [
							'lib/intro.stub',
							'<%= concat.engine.coreFiles %>',
							// include rules / checks / commons
							'<%= configure.rules.files[' + i + '].dest.auto %>',
							'lib/outro.stub'
						],
						dest: 'axe' + lang + '.js'
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
		'generate-imports': {
			// list of external dependencies, which needs to be added to axe.imports object
			data: {
				axios: './node_modules/axios/dist/axios.js',
				doT: {
					file: './node_modules/dot/doT.js',
					umd: false,
					global: 'doT'
				}
			}
		},
		'aria-supported': {
			data: {
				entry: 'lib/commons/aria/index.js',
				destFile: 'doc/aria-supported.md',
				listType: 'unsupported' // Possible values for listType: 'supported', 'unsupported', 'all'
			}
		},
		configure: {
			rules: {
				tmp: 'tmp/rules.js',
				options: {
					tags: grunt.option('tags')
				},
				files: langs.map(function(lang) {
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
		langs: {
			generate: {
				check: 'lib/commons/utils/valid-langs'
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
				files: langs.map(function(lang, i) {
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
						braces: true,
						quote_style: 1
					},
					output: {
						comments: /^\/*! aXe/
					}
				}
			},
			minify: {
				files: langs.map(function(lang, i) {
					return {
						src: ['<%= concat.engine.files[' + i + '].dest %>'],
						dest: './axe' + lang + '.min.js'
					};
				}),
				options: {
					output: {
						comments: /^\/*! aXe/
					},
					mangle: {
						reserved: ['commons', 'utils', 'axe', 'window', 'document']
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

		connect: {
			test: {
				options: {
					hostname: '0.0.0.0',
					port: grunt.option('port') || 9876,
					base: ['.']
				}
			}
		},
		eslint: {
			axe: {
				options: {
					eslintrc: true,
					reporter: grunt.option('report') ? 'checkstyle' : undefined,
					reporterOutput: grunt.option('report') ? 'tmp/lint.xml' : undefined
				},
				src: [
					'lib/**/*.js',
					'test/**/*.js',
					'build/**/*.js',
					'doc/**/*.js',
					'!doc/examples/jest_react/*.js',
					'Gruntfile.js',
					'!build/tasks/aria-supported.js',
					'!**/node_modules/**/*.js'
				]
			}
		},
		markdownlint: {
			all: {
				options: {
					config: grunt.file.readJSON('.markdownlint.json')
				},
				src: ['README.md', '.github/*.md', 'doc/**/*.md']
			}
		}
	});

	grunt.registerTask('default', ['build']);

	grunt.registerTask('build', [
		'clean',
		'generate-imports',
		'eslint',
		'validate',
		'concat:commons',
		'configure',
		'babel',
		'concat:engine',
		'uglify',
		'aria-supported'
	]);

	grunt.registerTask('test', [
		'build',
		'retire',
		'testconfig',
		'fixture',
		'connect',
		'mocha',
		'parallel',
		'eslint',
		'markdownlint'
	]);

	grunt.registerTask('ci-build', [
		'build',
		'retire',
		'testconfig',
		'fixture',
		'connect',
		'parallel',
		'eslint'
	]);

	grunt.registerTask('test-fast', [
		'build',
		'testconfig',
		'fixture',
		'connect',
		'mocha',
		'eslint'
	]);

	grunt.registerTask('translate', [
		'clean',
		'eslint',
		'validate',
		'concat:commons',
		'add-locale'
	]);

	grunt.registerTask('dev', [
		'build',
		'testconfig',
		'fixture',
		'connect',
		'watch'
	]);

	grunt.registerTask('dev:no-lint', [
		'clean',
		'validate',
		'concat:commons',
		'configure',
		'babel',
		'concat:engine',
		'uglify',
		'testconfig',
		'fixture',
		'connect',
		'watch'
	]);
};
