/*global dqreConfiguration */

/**
 * [publishMetaData description]
 * @param  {[type]} result [description]
 * @return {[type]}        [description]
 */
utils.publishMetaData = function (ruleResult) {
	'use strict';

	var checksData = dqreConfiguration.data.checks || {};
	var rulesData = dqreConfiguration.data.rules || {};

	ruleResult.details.forEach(function (detail) {
		detail.checks.forEach(function (check) {
			utils.extend(check, checksData[check.id] || {});
			if (check.failureMessage) {
				check.failureMessage = check.failureMessage(check);
			}
		});
	});
	utils.extend(ruleResult, rulesData[ruleResult.id] || {});
	if (ruleResult.failureMessage) {
		ruleResult.failureMessage = ruleResult.failureMessage(ruleResult);
	}
};