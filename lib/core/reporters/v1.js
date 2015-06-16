/*global helpers */

axe.reporter('v1', function (results, callback) {
	'use strict';
	callback(helpers.splitResults(results, function (nodeResult, data, result) {
		if (result === axe.constants.result.FAIL) {
			nodeResult.failureSummary = helpers.failureSummary(data);
		}

		return nodeResult;
	}));
});
