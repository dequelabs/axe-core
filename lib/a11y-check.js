/*global dqreConfiguration */

/**
 * Helper function to find help for associated Rule or Check
 * @todo  not sure this needs to exist
 * @private
 * @param  {String} type The type of message to lookup ('rule' or 'check')
 * @param  {String} id   The ID of the object to get
 * @return {String}      The help message (or empty string if not found)
 */
function findHelp(type, id) {
	'use strict';

	return (dqreConfiguration.messages[type + 'Help'] || {})[id] || '';
}

/**
 * Finds failing Checks and combines each help message into an array
 * @param  {Object} nodeData Individual "detail" object to generate help messages for
 * @return {Array}          Array of failure messages
 */
function failureSummary(nodeData) {
	'use strict';

	var fails = [],
		failingPasses = [],
		hasPassingPass = false;

	if (nodeData.result === dqre.constants.result.FAIL) {
		nodeData.checks.forEach(function (check) {
			var help = findHelp('check', check.id);
			if (help) {
				if (check.result && check.type === dqre.constants.type.FAIL) {
					fails.push(help);

				} else if (check.type === dqre.constants.type.PASS) {
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
		// format the results correctly
		results.forEach(function (rr) {

			var ruleResult = {
					id: rr.id,
					help: findHelp('rule', rr.id),
					nodes: []
				};
			rr.details.forEach(function (nodeData) {
				var nodeDetail = {
					checks: nodeData.checks,
					target: nodeData.node ? (nodeData.node.frames || []).concat(nodeData.node.selector) : null,
					html: nodeData.node.source
				};

				var failures = failureSummary(nodeData);
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