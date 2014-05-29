/*global dqreConfiguration */

function findCheckMessage(id) {
	'use strict';

	if (!dqreConfiguration || !dqreConfiguration.messages ||
		!dqreConfiguration.messages.checkHelp || !dqreConfiguration.messages.checkHelp[id]) {
		return '';
	}
	return dqreConfiguration.messages.checkHelp[id];
}

function failureSummary(ruleResult, nodeData) {
	'use strict';

	var message = '', fails = [];
	if (ruleResult.result !== dqre.constants.result.WARN && ruleResult.result !== dqre.constants.result.FAIL) {
		return undefined;
	}
	nodeData.checks.forEach(function (check) {
		var help = findCheckMessage(check.id);
		if (!check.value && help &&
			((check.result !== ruleResult.result && check.result === dqre.constants.result.PASS) ||
			(check.result === dqre.constants.result.WARN && check.result === ruleResult.result))) {
			fails.push(check);
		}
	});
	fails.forEach(function (check, index, arr) {
		var help = findCheckMessage(check.id);
		if (help && arr.length > (index + 1) && index && message.length) {
			message += ', ';
		} else if (help && index && message.length) {
			message += ' & ';
		}
		if (help) {
			message += help;
		}
	});
	return message;
}

function ruleHelp(ruleId) {
	'use strict';

	if (!dqreConfiguration || !dqreConfiguration.messages ||
		!dqreConfiguration.messages.ruleHelp || !dqreConfiguration.messages.ruleHelp[ruleId]) {
		return '';
	}
	return dqreConfiguration.messages.ruleHelp[ruleId];
}

function nodeSelectorArray(nodeData) {
	'use strict';

	var retVal = [];
	if (!nodeData || !nodeData.node || !nodeData.node.frames || !nodeData.node.selector) {
		return retVal;
	}
	nodeData.node.frames.forEach(function (frameSelector) {
		retVal.push(frameSelector);
	});
	retVal.push(nodeData.node.selector);
	return retVal;
}

dqre.a11yCheck = function (context, options, callback) {
	'use strict';

	dqre.run(context, options, function (results) {
		var checkResults = {
			violations: [],
			warnings: [],
			passes: []
		};
		// format the results correctly
		results.forEach(function (rr) {
			var rule = dqre.audit.findRule(rr.id),
				ruleResult = {
					id: rr.id,
					help: ruleHelp(rule.id),
					nodes: []
				};
			rr.details.forEach(function (nodeData) {
				ruleResult.nodes.push({
					failureSummary: failureSummary(rr, nodeData),
					checks: nodeData.checks,
					target: nodeSelectorArray(nodeData),
					html: nodeData.node.source
				});
			});
			if (rr.result === dqre.constants.result.PASS ||
				rr.result === dqre.constants.result.NA) {
				checkResults.passes.push(ruleResult);
			} else if (rr.result === dqre.constants.result.WARN) {
				checkResults.warnings.push(ruleResult);
			} else if (rr.result === dqre.constants.result.FAIL) {
				checkResults.violations.push(ruleResult);
			}
		});
		callback(checkResults);
	});
};