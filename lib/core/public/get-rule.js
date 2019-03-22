/**
 * Searches and returns rule that matches the ruleId
 * @param  {String}   ruleId  Id of the rule
 * @return {Rule}  rule
 */
axe.getRule = function(ruleId) {
	'use strict';

	return axe._audit.rules.find(rule => rule.id === ruleId);
};
