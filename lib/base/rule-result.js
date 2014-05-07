/*global DqNode */

function RuleResult(rule) {
	'use strict';

	this.id = rule.id;
	this.type = rule.type;
	this.details = [];
}

RuleResult.prototype.addResults = function (node, checks) {
	'use strict';
	var checkResult = utils.bubbleResult(checks);

	this.details.push({
		node: new DqNode(node),
		result: checkResult,
		value: (checkResult === dqre.constants.result.PASS ? true : false),
		checks: checks
	});
};