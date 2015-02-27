/*global dqreConfiguration, runRules */

/**
 * Finds failing Checks and combines each help message into an array
 * @param  {String} result  The result of the Rule; PASS, FAIL or NA
 * @param  {Object} nodeData Individual "detail" object to generate help messages for
 * @return {String}          failure messages
 */
function failureSummary(nodeData) {
	'use strict';

	var failingChecks = utils.getFailingChecks(nodeData);
	// combine "all" and "none" as messaging is the same
	failingChecks.none = failingChecks.none.concat(failingChecks.all);
	failingChecks.all = [];

	return Object.keys(failingChecks).map(function (key) {
		if (!failingChecks[key].length) {
			return;
		}
		// @todo rm .failureMessage
		return dqreConfiguration.data.failureSummaries[key].failureMessage(failingChecks[key].map(function (check) {
			return check.failureMessage || '';
		}));
	}).filter(function (i) {
		return i !== undefined;
	}).join('\n\n');
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
			failResult.impact = rr.impact;

			rr.nodes.forEach(function (nodeData) {
				var nodeDetail = {
					target: nodeData.node ? nodeData.node.selector : null,
					html: nodeData.node.source
				};

				var result = nodeData.result || rr.result;

				if (result === dqre.constants.result.FAIL) {
					nodeDetail.failureSummary = failureSummary(nodeData);
					// page-level rules do not have node-level impact
					if (nodeData.impact) {
						nodeDetail.impact = nodeData.impact;
					}
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
