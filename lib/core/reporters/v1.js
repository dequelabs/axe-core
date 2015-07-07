/*global helpers */

axe.reporter('v1', function (results, callback) {
	'use strict';
	var formattedResults = helpers.splitResults(results, function (nodeResult, data, result) {
		if (result === axe.constants.result.FAIL) {
			nodeResult.failureSummary = helpers.failureSummary(data);
		}

		return nodeResult;
	});
	callback({
		violations: formattedResults.violations,
		passes: formattedResults.passes,
		timestamp: formattedResults.timestamp,
		url: formattedResults.url
	});
});
