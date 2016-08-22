/*jshint node: true, maxstatements: 20 */
'use strict';

var clone = require('clone');
var dot = require('dot');
var templates = require('./templates');
var buildManual = require('./build-manual');
var entities =  new (require('html-entities').AllHtmlEntities)();

var descriptionHeaders = '| Rule ID | Description | Tags | Enabled by default |\n| :------- | :------- | :------- | :------- |\n';

dot.templateSettings.strip = false;

function buildRules(grunt, options, commons, callback) {

	options.getFiles = false;
	buildManual(grunt, options, commons, function (result) {

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
			return string.replace(/"(evaluate|after|gather|matches|source|commons)":\s*("[^"]+?")/g, function (m, p1, p2) {
				return m.replace(p2, getSource(p2.replace(/^"|"$/g, ''), p1));
			}).replace(/"(function anonymous\([\s\S]+?\) {)([\s\S]+?)(})"/g, function (m) {
				return JSON.parse(m);
			}).replace(/"(\(function \(\) {)([\s\S]+?)(}\)\(\))"/g, function (m) {
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
				var c = {};
				var id = typeof check === 'string' ? check : check.id;
				var definition = clone(findCheck(checks, id));
				if (!definition) {
					grunt.log.error('check ' + id + ' not found');
				}
				c.options = check.options || definition.options;
				c.id = id;

				if (definition.metadata && !metadata.checks[id]) {
					metadata.checks[id] = parseMetaData(definition.metadata);
				}

				return c.options === undefined ? id : c;
			});

		}

		var metadata = {
			rules: {},
			checks: {}
		};

		var descriptions = [];

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
			descriptions.push([rule.id, entities.encode(rule.metadata.description), rule.tags.join(', '), rule.enabled === false ? false : true]);
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
				checks: checks,
				commons: result.commons
			}, blacklist)),
			manual: replaceFunctions(JSON.stringify({
				data: metadata,
				rules: rules,
				checks: checks,
				commons: result.commons,
				tools: result.tools,
				style: result.style
			}, blacklist)),
			descriptions: descriptionHeaders + descriptions.map(function (row) {
				return '| ' + row.join(' | ') + ' |';
			}).join('\n')
		});

	});


}

module.exports = buildRules;
