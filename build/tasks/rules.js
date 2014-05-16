/*jshint node: true */
'use strict';

var path = require('path');

var CHECK_TEMPLATE = 'function (node, options) {\n<%=source%>\n}';

module.exports = function (grunt) {

	function createCheckObject(checks) {
		var result = {};
		checks.forEach(function (check) {
			result[check.id] = check;
		});
		return result;
	}

	function replaceFunctions(string) {
		return string.replace(/"(?:evaluate|after)":\s*("[^"]+")/g, function (m, p1) {
			return m.replace(p1, getSource(p1.replace(/^"|"$/g, '')));
		});
	}

	function getSource(file) {
		return grunt.template.process(CHECK_TEMPLATE, {
			data: {
				source: grunt.file.read(file)
			}
		});
	}

	function getChecks(src) {
		var files = grunt.file.expand(src);
		return files.map(function (file) {
			var json = grunt.file.readJSON(file);
			var dirname = path.dirname(file);
			if (json.evaluate) {
				json.evaluate = path.resolve(dirname, json.evaluate);
			}
			if (json.after) {
				json.after = path.resolve(dirname, json.after);
			}

			return json;
		});
	}

	function getRules(src) {
		var files = grunt.file.expand(src);
		return files.map(function (file) {
			var json = grunt.file.readJSON(file);
			return json;
		});

	}

	function findCheck(checks, id) {
		return checks.filter(function (check) {
			if (check.id === id) {
				return true;
			}
		})[0];
	}

	grunt.registerMultiTask('rules', function () {

		function blacklist(k, v) {
			if (options.blacklist.indexOf(k) !== -1) {
				return undefined;
			}
			return v;
		}

		var options = this.options({
			rules: ['lib/rules/**/*.json'],
			checks: ['lib/checks/**/*.json'],
			blacklist: ['help', 'title']
		});
		var rules = getRules(options.rules);
		var checks = getChecks(options.checks);

		rules.map(function (rule) {
			rule.checks = rule.checks.map(function (check) {
				var id = typeof check === 'string' ? check : check.id;
				var c = findCheck(checks, id);
				c.options = check.options || c.options;

				return c;
			});
			return rule;
		});
		var r = replaceFunctions(JSON.stringify(rules, blacklist));
		var r2 = replaceFunctions(JSON.stringify(rules));
		var c = replaceFunctions(JSON.stringify(createCheckObject(checks), blacklist));

		grunt.file.write(this.data.dest.rules, 'var dqreRules = ' + r + ';');
		grunt.file.write(this.data.dest.full, 'var dqreRules = ' + r2 + ';');
		grunt.file.write(this.data.dest.checks, 'var checks = ' + c + ';');

	});
};