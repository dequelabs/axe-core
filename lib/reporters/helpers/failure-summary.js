/*global helpers, dqreConfiguration */

/**
 * Finds failing Checks and combines each help message into an array
 * @param  {Object} nodeData Individual "detail" object to generate help messages for
 * @return {String}          failure messages
 */
helpers.failureSummary = function failureSummary(nodeData) {
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
};
