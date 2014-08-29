/**
 * Finds failing Checks and combines each help message into an array
 * @param  {String} result  The result of the Rule; PASS, FAIL or NA
 * @param  {Object} nodeData Individual "detail" object to generate help messages for
 * @return {Array}          Array of failure messages
 */
function failureSummary(result, nodeData) {
	'use strict';

	var fails = [],
		failingPasses = [],
		hasPassingPass = false;

	if (result === dqre.constants.result.FAIL) {
		nodeData.checks.forEach(function (check) {
			var help = check.failureMessage || '';
			if (check.result && check.type === dqre.constants.type.FAIL) {
				fails.push(help);

			} else if (check.type === dqre.constants.type.PASS) {
				if (check.result) {
					hasPassingPass = true;
				} else {
					failingPasses.push(help);
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

/**
 * Run analysis and return violations and passes
 * @param  {Mixed}   context  The context of which to run analysis (@see Context)
 * @param  {Array}   options  Array of RuleOptions
 * @param  {Function} callback Function to execute when analysis is complete; receives a single
 * object with `violations` and `passes` arrays
 */
dqre.a11yCheck = function (context, options, callback) {
	'use strict';

	dqre.run(context, options, function (results) {
		var checkResults = {
			violations: [],
			passes: []
		};
		results.forEach(function (rr) {
			var failResult,
				passResult = {
					id: rr.id,
					help: rr.help,
					nodes: []
				};
			if (rr.helpUrl) {
				passResult.helpUrl = rr.helpUrl;
			}

			failResult = utils.clone(passResult);

			rr.details.forEach(function (nodeData) {
				var nodeDetail = {
					checks: nodeData.checks,
					target: nodeData.node ? nodeData.node.selector : null,
					html: nodeData.node.source
				};

				var failures = failureSummary(nodeData.result || rr.result, nodeData);
				if (failures.length) {
					nodeDetail.failureSummary = failures;
					failResult.nodes.push(nodeDetail);
				} else {
					passResult.nodes.push(nodeDetail);
				}
			});

			if (failResult.nodes.length) {
				checkResults.violations.push(failResult);
			}
			if (passResult.nodes.length) {
				checkResults.passes.push(passResult);
			}
		});
		callback(checkResults);
	});
};
