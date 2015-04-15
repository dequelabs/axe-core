/*global dqreConfiguration */

/**
 * Searches and returns rules that contain a tag in the list of tags.
 * @param  {Array}   tags  Optional array of tags
 * @return {Array}  Array of rules
 */
dqre.getRules = function (tags) {
	'use strict';

	tags = tags || [];
	var matchingRules = !tags.length ? dqre.audit.rules : dqre.audit.rules.filter(function (item) {
		return !!tags.filter(function (tag) {
			return item.tags.indexOf(tag) !== -1;
		}).length;
	});

	var ruleData = dqreConfiguration.data.rules || {};
	return matchingRules.map(function (matchingRule) {
		var rd = ruleData[matchingRule.id] || {description: ''};
		return {ruleId: matchingRule.id, description: rd.description};
	});
};
