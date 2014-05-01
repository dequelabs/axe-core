/*global DqNode */

function RuleResult(rule) {
	'use strict';

	this.id = rule.id;
	this.details = [];
}

RuleResult.prototype.addResults = function (node, checks) {
	'use strict';

	this.details.push({
		node: new DqNode(node),
		result: utils.bubbleResult(checks),
		checks: checks
	});
};