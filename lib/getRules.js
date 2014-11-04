/*global dqreConfiguration */

/**
 * Searches and returns rules that contain a tag in the list of tags.
 * @param  {Array}   tags  Array of tags
 * @return {Array}  Array of rules
 */
dqre.getRules = function (tags) {
	'use strict';

	tags = tags || [];
	var matchingRules = dqre.audit.rules.filter(function (item) {
		return !!tags.filter(function (tag) {
			return item.tags.indexOf(tag) !== -1;
		}).length;
	});

	var retValue = [];
	var ruleData = dqreConfiguration.data.rules || [];
	matchingRules.forEach(function (matchingRule) {
		var rd = ruleData[matchingRule.id] || {description: ''};
		retValue.push({ruleId: matchingRule.id, description: rd.description});
	});
	return retValue;
};