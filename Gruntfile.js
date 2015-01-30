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
	grunt.loadNpmTasks('grunt-mocha-test');
	grunt.loadTasks('build/tasks');

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		clean: ["dist"],
		watch: {
			files: ['test/**/*', 'lib/**/*'],
			tasks: ['fixture', 'build']
		},
		auto: {
			lib: {
				options: {
					tags: grunt.option('tags'),
					version: '<%= pkg.version %>'
				},
				dest: {
					rules: 'dist/rules.js',
					checks: 'dist/checks.js',
					descriptions: 'dist/descriptions.html'
				}
			}
		},
		manual: {
			lib: {
				options: {
					version: '<%= pkg.version %>'
				},
				dest: 'dist/manual.js'
			}
		},
		validate: {
			tools: {
				options: {
					type: 'tool'
				},
				src: 'lib/tools/**/*.json'
			},
			classifiers: {
				options: {
					type: 'classifier'
				},
				src: 'lib/classifiers/**/*.json'
			},
			analyzers: {
				options: {
					type: 'analyzer'
				},
				src: 'lib/analyzers/**/*.json'
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
					src: ['<%= auto.lib.dest.rules %>'],
					dest: 'dist/rules.min.js'
				}, {
					src: ['<%= auto.lib.dest.checks %>'],
					dest: 'dist/checks.min.js'
				}]
			},
			beautify: {
				files: [{
					src: ['<%= auto.lib.dest.rules %>'],
					dest: '<%= auto.lib.dest.rules %>'
				}, {
					src: ['<%= auto.lib.dest.checks %>'],
					dest: '<%= auto.lib.dest.checks %>'
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
				src: '<%= auto.lib.dest.checks %>',
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
					urls: ['http://localhost:<%= connect.test.options.port %>/test/checks/'],
					reporter: 'XUnit',
					timeout: 10000,
					threshold: 90
				},
				dest: 'xunit.xml'
			}
		},
		mochaTest: {
			test: {
				options: {
					reporter: 'spec'
				},
				src: ['test/tasks/*.js']
			}
		},
		blanket_mocha: {
			test: {
				options: {
					urls: ['http://localhost:<%= connect.test.options.port %>/test/checks/'],
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
					reporter: grunt.option('report') ? 'checkstyle' : undefined,
					reporterOutput: grunt.option('report') ? 'lint.xml' : undefined
				},
				src: ['lib/**/*.js', 'test/**/*.js', 'Gruntfile.js', '!test/mock/**/*.js']
			}
		}
	});

	grunt.registerTask('server', ['fixture', 'connect:test:keepalive']);
	grunt.registerTask('test', ['mochaTest', 'build', 'fixture', 'connect:test', grunt.option('report') ? 'mocha' : 'blanket_mocha']);
	grunt.registerTask('build', ['validate', 'auto', 'manual', 'uglify']);
	grunt.registerTask('default', ['build']);

};
