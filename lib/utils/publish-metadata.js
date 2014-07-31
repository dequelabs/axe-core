/*global dqreConfiguration */

/**
 * Publish metadata from dqreConfiguration.data
 * @param  {RuleResult} result Result to publish to
 * @private
 */
utils.publishMetaData = function (ruleResult) {
	'use strict';
	var checksData = dqreConfiguration.data.checks || {};
	var rulesData = dqreConfiguration.data.rules || {};

	ruleResult.details.forEach(function (detail) {
		detail.checks.forEach(function (check) {
			checksData[check.id] = checksData[check.id] || {};
			if (!utils.isCheckFailing(check)) {
				checksData[check.id].failureMessage = null;
			}
			utils.extendMetaData(check, checksData[check.id] || {});
		});
	});
	utils.extendMetaData(ruleResult, rulesData[ruleResult.id] || {});
};