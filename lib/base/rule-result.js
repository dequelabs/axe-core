/*exported RuleResult */
function RuleResult(rule) {
	'use strict';

	this.id = rule.id;
	this.result = dqre.constants.result.NA;
	this.pageLevel = rule.pageLevel;
	this.details = [];
}