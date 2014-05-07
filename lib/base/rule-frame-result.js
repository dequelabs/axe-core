/*global DqNode */

function RuleFrameResult(rule) {
	'use strict';

	this.id = rule.id;
	this.type = rule.type;
	this.details = [];
}

RuleFrameResult.prototype.addResults = function (node, checks) {
	'use strict';

	if (checks && checks.length) {
		this.details.push({
			node: new DqNode(node),
			checks: checks
		});
	}
};