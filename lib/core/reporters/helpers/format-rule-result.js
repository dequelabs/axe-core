/*global helpers */

helpers.formatRuleResult = function (ruleResult) {
	'use strict';
	
	return {
		id: ruleResult.id,
		description: ruleResult.description,
		help: ruleResult.help,
		helpUrl: ruleResult.helpUrl || null,
		impact: null,
		tags: ruleResult.tags,
		nodes: []
	};
};
