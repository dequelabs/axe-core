/*eslint-env node */
/*eslint max-statements: ["error", 20], max-len: off */
'use strict';

var clone = require('clone');
var dot = require('dot');
var templates = require('./templates');
var buildManual = require('./build-manual');
var entities = new (require('html-entities')).AllHtmlEntities();

var descriptionHeaders =
	'| Rule ID | Description | Impact | Tags | Enabled by default |\n| :------- | :------- | :------- | :------- | :------- |\n';

dot.templateSettings.strip = false;

function getLocale(grunt, options) {
	var localeFile;
	if (options.locale) {
		localeFile = './locales/' + options.locale + '.json';
	}

	if (localeFile) {
		return grunt.file.readJSON(localeFile);
	}
}

function buildRules(grunt, options, commons, callback) {
	var axeImpact = Object.freeze(['minor', 'moderate', 'serious', 'critical']); // TODO: require('../axe') does not work if grunt configure is moved after uglify, npm test breaks with undefined. Complicated grunt concurrency issue.
	var locale = getLocale(grunt, options);
	options.getFiles = false;
	buildManual(grunt, options, commons, function(result) {
		var metadata = {
			rules: {},
			checks: {}
		};
		var descriptions = [];
		var tags = options.tags ? options.tags.split(/\s*,\s*/) : [];
		var rules = result.rules;
		var checks = result.checks;

		// Translate checks
		if (locale && locale.checks) {
			checks.forEach(function(check) {
				if (locale.checks[check.id] && check.metadata) {
					check.metadata.messages = locale.checks[check.id];
				}
			});
		}

		function parseMetaData(source, propType) {
			var data = source.metadata;
			var key = source.id || source.type;
			if (key && locale && locale[propType] && propType !== 'checks') {
				data = locale[propType][key] || data;
			}
			var result = clone(data) || {};

			if (result.messages) {
				Object.keys(result.messages).forEach(function(key) {
					// only convert to templated function for strings
					// objects handled later in publish-metadata.js
					if (typeof result.messages[key] !== 'object') {
						result.messages[key] = dot
							.template(result.messages[key])
							.toString();
					}
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
			summaries.forEach(function(summary) {
				if (summary.type) {
					result[summary.type] = parseMetaData(summary, 'failureSummaries');
				}
			});
			return result;
		}

		function getIncompleteMsg(summaries) {
			var result = {};
			summaries.forEach(function(summary) {
				if (summary.incompleteFallbackMessage) {
					result = dot.template(summary.incompleteFallbackMessage).toString();
				}
			});
			return result;
		}

		function replaceFunctions(string) {
			return string
				.replace(
					/"(evaluate|after|gather|matches|source|commons)":\s*("[^"]+?")/g,
					function(m, p1, p2) {
						return m.replace(p2, getSource(p2.replace(/^"|"$/g, ''), p1));
					}
				)
				.replace(/"(function anonymous\([\s\S]+?\) {)([\s\S]+?)(})"/g, function(
					m
				) {
					return JSON.parse(m);
				})
				.replace(/"(\(function \(\) {)([\s\S]+?)(}\)\(\))"/g, function(m) {
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
			return checks.filter(function(check) {
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
			return collection.map(function(check) {
				var c = {};
				var id = typeof check === 'string' ? check : check.id;
				var definition = clone(findCheck(checks, id));
				if (!definition) {
					grunt.log.error('check ' + id + ' not found');
				}
				c.options = check.options || definition.options;
				c.id = id;

				if (definition.metadata && !metadata.checks[id]) {
					metadata.checks[id] = parseMetaData(definition, 'checks');
				}

				return c.options === undefined ? id : c;
			});
		}

		function parseImpactForRule(rule) {
			function capitalize(s) {
				return s.charAt(0).toUpperCase() + s.slice(1);
			}

			function getUniqueArr(arr) {
				return arr.filter(function(value, index, self) {
					return self.indexOf(value) === index;
				});
			}

			function getImpactScores(checkCollection) {
				return checkCollection.reduce(function(out, check) {
					var id = typeof check === 'string' ? check : check.id;
					var definition = clone(findCheck(checks, id));
					if (!definition) {
						grunt.log.error('check ' + id + ' not found');
					}
					if (definition && definition.metadata && definition.metadata.impact) {
						var impactScore = axeImpact.indexOf(definition.metadata.impact);
						out.push(impactScore);
					}
					return out;
				}, []);
			}

			function getScore(checkCollection, onlyHighestScore) {
				var scores = getImpactScores(checkCollection);
				if (scores && scores.length) {
					return onlyHighestScore
						? [Math.max.apply(null, scores)]
						: getUniqueArr(scores);
				} else {
					return [];
				}
			}

			var highestImpactForRuleTypeAny = getScore(rule.any, true);
			var allUniqueImpactsForRuleTypeAll = getScore(rule.all, false);
			var allUniqueImpactsForRuleTypeNone = getScore(rule.none, false);
			var cumulativeImpacts = highestImpactForRuleTypeAny
				.concat(allUniqueImpactsForRuleTypeAll)
				.concat(allUniqueImpactsForRuleTypeNone);
			var cumulativeScores = getUniqueArr(cumulativeImpacts).sort(); //order lowest to highest

			return cumulativeScores.reduce(function(out, cV) {
				return out.length
					? out + ', ' + capitalize(axeImpact[cV])
					: capitalize(axeImpact[cV]);
			}, '');
		}

		rules.map(function(rule) {
			var impact = parseImpactForRule(rule);
			rule.any = parseChecks(rule.any);
			rule.all = parseChecks(rule.all);
			rule.none = parseChecks(rule.none);
			if (rule.metadata && !metadata.rules[rule.id]) {
				metadata.rules[rule.id] = parseMetaData(rule, 'rules'); // Translate rules
			}
			descriptions.push([
				rule.id,
				entities.encode(rule.metadata.description),
				impact,
				rule.tags.join(', '),
				rule.enabled === false ? false : true
			]);
			if (tags.length) {
				rule.enabled = !!rule.tags.filter(function(t) {
					return tags.indexOf(t) !== -1;
				}).length;
			}
			return rule;
		});

		// Translate failureSummaries
		metadata.failureSummaries = createFailureSummaryObject(result.misc);
		metadata.incompleteFallbackMessage = getIncompleteMsg(result.misc);

		callback({
			auto: replaceFunctions(
				JSON.stringify(
					{
						data: metadata,
						rules: rules,
						checks: checks,
						commons: result.commons
					},
					blacklist
				)
			),
			manual: replaceFunctions(
				JSON.stringify(
					{
						data: metadata,
						rules: rules,
						checks: checks,
						commons: result.commons,
						tools: result.tools
					},
					blacklist
				)
			),
			descriptions:
				descriptionHeaders +
				descriptions
					.map(function(row) {
						return '| ' + row.join(' | ') + ' |';
					})
					.join('\n')
		});
	});
}

module.exports = buildRules;
