/*jshint node: true */
'use strict';

var path = require('path');
var clone = require('clone');
var dot = require('dot');

dot.templateSettings.strip = false;

var templates = {
	evaluate: 'function (node, options) {\n<%=source%>\n}',
	after: 'function (results, options) {\n<%=source%>\n}',
	gather: 'function (context) {\n<%=source%>\n}',
	matches: 'function (node) {\n<%=source%>\n}',
};

var fns = {
	check: ['evaluate', 'after', 'matches'],
	rule: ['matches'],
	failureSummary: []
};

module.exports = function (grunt) {

	function parseMetaData(data) {
		var result = clone(data) || {};
		if (result.failureMessage) {
			result.failureMessage = dot.template(result.failureMessage).toString();
		}
		return result;
	}

	function createCheckObject(checks) {
		var result = {};
		checks.forEach(function (check) {
			result[check.id] = check;
		});
		return result;
	}

	function createFailureSummaryObject(summaries) {
		var result = {};
		summaries.forEach(function (summary) {
			result[summary.type] = parseMetaData(summary.metadata);
		});
		return result;
	}


	function replaceFunctions(string) {
		return string.replace(/"(evaluate|after|gather|matches)":\s*("[^"]+")/g, function (m, p1, p2) {
			return m.replace(p2, getSource(p2.replace(/^"|"$/g, ''), p1));
		}).replace(/"(function anonymous\([\s\S]+?\) {)([\s\S]+?)(})"/g, function (m, p1, p2, p3) {
			return JSON.parse(m);
		});
	}

	function getSource(file, type) {
		return grunt.template.process(templates[type], {
			data: {
				source: grunt.file.read(file)
			}
		});
	}

	function parseObject(src, type) {
		var files = grunt.file.expand(src);
		return files.map(function (file) {
			var json = grunt.file.readJSON(file);
			var dirname = path.dirname(file);
			fns[type].forEach(function (name) {
				if (json[name]) {
					json[name] = path.resolve(dirname, json[name]);
				}
			});
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

		var metadata = {
			rules: {},
			checks: {}
		};

		var options = this.options({
			rules: ['lib/rules/**/*.json'],
			checks: ['lib/checks/**/*.json'],
			misc: ['lib/misc/**/*.json'],
			blacklist: ['metadata'],
			tags: ''
		});

		var tags = options.tags ? options.tags.split(/\s*,\s*/) : [];

		var rules = parseObject(options.rules, 'rule');
		var checks = parseObject(options.checks, 'check');

		rules.map(function (rule) {
			rule.checks = rule.checks.map(function (check) {

				var id = typeof check === 'string' ? check : check.id;
				var c = clone(findCheck(checks, id));
				if (!c) throw new Error('check ' + id + ' not found');
				c.options = check.options || c.options;

				if (c.metadata && !metadata.checks[id]) {
					metadata.checks[id] = parseMetaData(c.metadata);
				}

				return c;
			});
			if (rule.metadata && !metadata.rules[rule.id]) {
				metadata.rules[rule.id] = parseMetaData(rule.metadata);
			}
			if (tags.length) {
				rule.enabled = !!rule.tags.filter(function (t) {
					return tags.indexOf(t) !== -1;
				}).length;
			}
			return rule;
		});
		var failureSummaries = parseObject(options.misc, 'failureSummary');
		metadata.failureSummaries = createFailureSummaryObject(failureSummaries);
		var r = replaceFunctions(JSON.stringify({ data: metadata, rules: rules }, blacklist));
		var c = replaceFunctions(JSON.stringify(createCheckObject(checks), blacklist));

		grunt.file.write(this.data.dest.rules, 'dqre.configure(' + r + ');');
		grunt.file.write(this.data.dest.checks, 'var checks = ' + c + ';');

	});
};