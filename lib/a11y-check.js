/*global dqreConfiguration */

function findHelp(type, id) {
	'use strict';

	return (dqreConfiguration.messages[type + 'Help'] || {})[id] || '';
}

function failureSummary(ruleResult, nodeData) {
	'use strict';

	var fails = [],
		failingPasses = [],
		hasPassingPass = false;

	if (ruleResult.result === dqre.constants.result.FAIL) {
		nodeData.checks.forEach(function (check) {
			var help = findHelp('check', check.id);
			if (help) {
				if (check.result && check.type === dqre.constants.result.FAIL) {
					fails.push(help);

				} else if (check.type === dqre.constants.result.PASS) {
					if (check.result) {
						hasPassingPass = true;
					} else {
						failingPasses.push(help);
					}
				}
			}
		});
	}

	// If there is a passing PASS, we don't want to report on "failing" PASSes
	if (!hasPassingPass) {
		fails.push.apply(fails, failingPasses);
	}
	return fails;
}

dqre.a11yCheck = function (context, options, callback) {
	'use strict';

	dqre.run(context, options, function (results) {
		var checkResults = {
			violations: [],
			passes: []
		};
		// format the results correctly
		results.forEach(function (rr) {

			var ruleResult = {
					id: rr.id,
					help: findHelp('rule', rr.id),
					nodes: []
				};
			rr.details.forEach(function (nodeData) {
				var failures = failureSummary(rr, nodeData);
				var nodeDetail = {
					checks: nodeData.checks,
					target: nodeData.node ? (nodeData.node.frames || []).concat(nodeData.node.selector) : null,
					html: nodeData.node.source
				};

				if (failures.length) {
					nodeDetail.failureSummary = failures;
				}

				ruleResult.nodes.push(nodeDetail);
			});
			if (rr.result === dqre.constants.result.PASS ||
				rr.result === dqre.constants.result.NA) {
				checkResults.passes.push(ruleResult);
			} else if (rr.result === dqre.constants.result.FAIL) {
				checkResults.violations.push(ruleResult);
			}
		});
		callback(checkResults);
	});
};