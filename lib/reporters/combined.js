/*global helpers */

dqre.reporter('combined', function (results, callback) {
	'use strict';
	callback(helpers.splitResults(results, function (nodeResult, data, result) {
		if (result === dqre.constants.result.FAIL) {
			nodeResult.failureSummary = helpers.failureSummary(data);
		}

		return nodeResult;
	}));
}, true);
