/*jshint node: true */
'use strict';

var path = require('path');
var clone = require('clone');
var dot = require('dot');
var Encoder = require('node-html-encoder').Encoder;
var encoder = new Encoder('entity');
var templates = require('./templates');
var buildManual = require('./build-manual');

var descriptionTmpl = '<tr><td><%=id%></td><td><%=description%></td><td><%=tags%></td></tr>\n',
	descriptionsTmpl = '<!DOCTYPE html>\n<html>\n<head></head>\n<body>\n<table>\n<thead><tr>' +
		'<th scope="col">Rule ID</th><th scope="col">Description</th><th scope="col">Tags</th></tr>' +
		'</thead>\n<tbody><%=descriptions%></tbody>\n</table>\n</body>\n</html>';

dot.templateSettings.strip = false;

function buildRules(grunt, options, callback) {

	options.getFiles = false;
	buildManual(grunt, options, function (result) {

		function parseMetaData(data) {
			var result = clone(data) || {};
			if (result.messages) {
				Object.keys(result.messages).forEach(function (key) {
					result.messages[key] = dot.template(result.messages[key]).toString();
				});
			}
			//TODO this is actually failureSummaries, property name should better reflect that
			if (result.failureMessage) {
				result.failureMessage = dot.template(result.failureMessage).toString();
			}
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
			return string.replace(/"(evaluate|after|gather|matches|source)":\s*("[^"]+")/g, function (m, p1, p2) {
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

		function findCheck(checks, id) {
			return checks.filter(function (check) {
				if (check.id === id) {
					return true;
				}
			})[0];
		}

		function blacklist(k, v) {
			if (options.blacklist.indexOf(k) !== -1) {
				return undefined;
			}
			return v;
		}

		function parseChecks(collection) {
			return collection.map(function (check) {

				var id = typeof check === 'string' ? check : check.id;
				var c = clone(findCheck(checks, id));
				if (!c) grunt.log.error('check ' + id + ' not found');
				c.options = check.options || c.options;

				if (c.metadata && !metadata.checks[id]) {
					metadata.checks[id] = parseMetaData(c.metadata);
				}

				return c;
			});

		}

		var metadata = {
			rules: {},
			checks: {}
		};

		var descriptions = '';

		var tags = options.tags ? options.tags.split(/\s*,\s*/) : [];

		var rules = result.rules;
		var checks = result.checks;

		rules.map(function (rule) {

			rule.any = parseChecks(rule.any);
			rule.all = parseChecks(rule.all);
			rule.none = parseChecks(rule.none);

			if (rule.metadata && !metadata.rules[rule.id]) {
				metadata.rules[rule.id] = parseMetaData(rule.metadata);
			}
			descriptions += grunt.template.process(descriptionTmpl, {
				data: {
					id: rule.id,
					description: encoder.htmlEncode(rule.metadata.description),
					tags: rule.tags.join(', ')
				}
			});
			if (tags.length) {
				rule.enabled = !!rule.tags.filter(function (t) {
					return tags.indexOf(t) !== -1;
				}).length;
			}
			return rule;
		});

		metadata.failureSummaries = createFailureSummaryObject(result.misc);
		callback({
			auto: replaceFunctions(JSON.stringify({
				data: metadata,
				rules: rules,
				version: options.version
			}, blacklist)),
			manual: replaceFunctions(JSON.stringify({
				data: metadata,
				rules: rules,
				tools: result.tools,
				style: result.style,
				version: options.version
			}, blacklist)),
			test: replaceFunctions(JSON.stringify(result.checks, blacklist, '  ')),
			descriptions: grunt.template.process(descriptionsTmpl, {
				data: {
					descriptions: descriptions
				}
			})
		});

	});


}

module.exports = buildRules;
