/*global dqreConfiguration */

function findCheckMessage(id) {
	'use strict';

	if (!dqreConfiguration || !dqreConfiguration.messages ||
		!dqreConfiguration.messages.checkHelp || !dqreConfiguration.messages.checkHelp[id]) {
		return '';
	}
	return dqreConfiguration.messages.checkHelp[id];
}

function getFailedPasses(checks) {
	'use strict';
	var passes = [],
		pass = false;
	checks.forEach(function (check) {
		if (check.type === dqre.constants.result.PASS) {
			passes.push(check);
		}
		if (check.result === dqre.constants.result.PASS) {
			pass = true;
		}
	});
	if (pass) {
		return [];
	}
	return passes;
}

function getFailedFails(checks) {
	'use strict';
	var fails = checks.filter(function (check) {
		return (check.type === dqre.constants.result.FAIL &&
			check.result === dqre.constants.result.FAIL);
	});
	return fails;
}

function failureSummary(ruleResult, nodeData) {
	'use strict';

	var fails = [], helps = [];
	if (ruleResult.result !== dqre.constants.result.FAIL) {
		return undefined;
	}
	fails = getFailedPasses(nodeData.checks);
	fails = fails.concat(getFailedFails(nodeData.checks));
	fails.forEach(function (check) {
		var msg = findCheckMessage(check.id);
		if (msg) {
			helps.push(msg);
		}
	});
	return helps;
}

function failureLevel(ruleResult, nodeData) {
	'use strict';
	var certainty, interpretation, impact, fails;

	if (ruleResult.result !== dqre.constants.result.FAIL) {
		return {
			certainty: undefined,
			interpretation: undefined,
			impact: undefined
		};
	}
	fails = getFailedPasses(nodeData.checks);
	fails = fails.concat(getFailedFails(nodeData.checks));
	certainty = dqre.constants.certainty.POTENTIAL;
	fails.forEach(function (check) {
		if (check.certainty === dqre.constants.certainty.DEFINITE) {
			certainty = dqre.constants.certainty.DEFINITE;
		}
	});
	interpretation = dqre.constants.interpretation.BESTPRACTICE;
	fails.forEach(function (check) {
		if (check.interpretation === dqre.constants.interpretation.VIOLATION) {
			interpretation = dqre.constants.interpretation.VIOLATION;
		}
	});
	impact = dqre.constants.impact.TRIVIAL;
	fails.forEach(function (check) {
		if (impact === dqre.constants.impact.TRIVIAL &&
			check.impact !== dqre.constants.impact.TRIVIAL) {
			impact = check.impact;
		} else if (impact === dqre.constants.impact.MINOR &&
			check.impact !== dqre.constants.impact.TRIVIAL &&
			check.impact !== dqre.constants.impact.MINOR) {
			impact = check.impact;
		} else if (check.impact === dqre.constants.impact.CRITICAL) {
			impact = check.impact;
		}
	});
	return {
		certainty: certainty,
		interpretation: interpretation,
		impact: impact
	};
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

function makeRuleResult(rr) {
	'use strict';
	return {
		id: rr.id,
		help: ruleHelp(rr.id),
		nodes: []
	};
}

dqre.a11yCheck = function (context, options, callback) {
	'use strict';

	dqre.run(context, options, function (results) {
		var checkResults = {
			violations: [],
			bestpractices: [],
			potentials: [],
			passes: []
		};
		// format the results correctly
		results.forEach(function (rr) {

			var passRuleResult, potentialRuleResult, bpRuleResult, violRuleResult;

			passRuleResult = makeRuleResult(rr);
			potentialRuleResult = makeRuleResult(rr);
			bpRuleResult = makeRuleResult(rr);
			violRuleResult = makeRuleResult(rr);
			rr.details.forEach(function (nodeData) {
				var level = failureLevel(rr, nodeData),
					ruleResult;
				if (!level.certainty) {
					ruleResult = passRuleResult;
				} else {
					if (level.certainty === dqre.constants.certainty.POTENTIAL) {
						ruleResult = potentialRuleResult;
					} else if (level.interpretation === dqre.constants.interpretation.BESTPRACTICE) {
						ruleResult = bpRuleResult;
					} else {
						ruleResult = violRuleResult;
					}
				}
				ruleResult.nodes.push({
					failureSummary: failureSummary(rr, nodeData),
					certainty: level.certainty,
					interpretation: level.interpretation,
					impact: level.impact,
					checks: nodeData.checks,
					target: nodeSelectorArray(nodeData),
					html: nodeData.node.source
				});
			});
			if (passRuleResult.nodes.length) {
				checkResults.passes.push(passRuleResult);
			}
			if (potentialRuleResult.nodes.length) {
				checkResults.potentials.push(potentialRuleResult);
			}
			if (bpRuleResult.nodes.length) {
				checkResults.bestpractices.push(bpRuleResult);
			}
			if (violRuleResult.nodes.length) {
				checkResults.violations.push(violRuleResult);
			}
		});
		callback(checkResults);
	});
};