/*global DqNode */

function RuleResult(rule) {
	'use strict';

	this.id = rule.id;
	this.result = dqre.constants.result.NA;
	this.details = [];
}

RuleResult.prototype.addResults = function (node, checks) {
	'use strict';
	var checkResult = utils.bubbleCheckResult(checks);

	this.details.push({
		node: new DqNode(node),
		result: checkResult,
		checks: checks
	});
};