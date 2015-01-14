/*global dqreConfiguration, runRules */

/**
 * Finds failing Checks and combines each help message into an array
 * @param  {String} result  The result of the Rule; PASS, FAIL or NA
 * @param  {Object} nodeData Individual "detail" object to generate help messages for
 * @return {String}          failure messages
 */
function failureSummary(result, nodeData) {
	'use strict';

	var fails = [],
		failingPasses = [],
		hasPassingPass = false,
		failMessage = '';

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
		if (fails.length > 0) {
			failMessage = dqreConfiguration.data.failureSummaries[dqre.constants.type.FAIL].failureMessage(fails);
		}
	}

	// If there is a passing PASS, we don't want to report on "failing" PASSes
	if (!hasPassingPass && failingPasses.length > 0) {
		var p = dqreConfiguration.data.failureSummaries[dqre.constants.type.PASS].failureMessage(failingPasses);
		if (failMessage) {
			failMessage += '\n';
		}
		failMessage += p;
	}
	return failMessage;
}

/**
 * Run analysis and return violations and passes
 * @param  {Mixed}   context  The context of which to run analysis (@see Context)
 * @param  {Array}   options  Array of RuleOptions
 * @param  {Function} callback Function to execute when analysis is complete; receives a single
 * object with `violations` and `passes` arrays
 */
dqre.run = dqre.a11yCheck = function (context, options, callback) {
	'use strict';

	runRules(context, options, function (results) {
		var checkResults = {
			violations: [],
			passes: []
		};
		results.forEach(function (rr) {
			var failResult,
				passResult = {
					id: rr.id,
					description: rr.description,
					help: rr.help,
					tags: rr.tags,
					nodes: []
				};
			if (rr.helpUrl) {
				passResult.helpUrl = rr.helpUrl;
			}

			failResult = utils.clone(passResult);

			rr.details.forEach(function (nodeData) {
				var nodeDetail = {
					target: nodeData.node ? nodeData.node.selector : null,
					html: nodeData.node.source
				};

				var result = nodeData.result || rr.result;

				if (result === dqre.constants.result.FAIL) {
					nodeDetail.failureSummary = failureSummary(result, nodeData);
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
