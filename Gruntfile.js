/*jshint node: true, camelcase: false */

module.exports = function (grunt) {
	'use strict';

	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-connect');
	grunt.loadNpmTasks('grunt-mocha');
	grunt.loadNpmTasks('grunt-blanket-mocha');
	grunt.loadTasks('build/tasks');

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		clean: ["dist"],
		watch: {
			files: '<%= concat.lib.src %>',
			tasks: ['concat']
		},
		concat: {
			lib: {
				src: [
					'lib/intro.stub',
					'lib/index.js',
					'lib/*/index.js',
					'lib/*/**/*.js',
					'lib/export.js',
					'lib/outro.stub'
				],
				dest: 'dist/ks-cf.js'
			},
			options: {
				process: true
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
		mocha: {
			test: {
				options: {
					urls: ['http://localhost:9876/test/unit/src.html'],
					reporter: 'XUnit',
					threshold: 90
				},
				dest: 'xunit.xml'
			}
		},
		blanket_mocha: {
			test: {
				options: {
					urls: ['http://localhost:9876/test/unit/src.html'],
					reporter: 'Spec',
					threshold: 90
				}
			}
		},
		fixture: {
			src: {
				src: '<%= concat.lib.src %>',
				dest: 'test/unit/src.html'
			},
			compiled: {
				src: '<%= concat.lib.dest %>',
				dest: 'test/unit/compiled.html'
			}
		}
	});

	grunt.registerTask('server', ['fixture', 'connect:test:keepalive']);
	grunt.registerTask('test', ['fixture', 'connect', 'mocha']);
	grunt.registerTask('build', ['concat']);
	grunt.registerTask('default', ['build']);

};
