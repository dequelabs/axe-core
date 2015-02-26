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
	var rule = utils.findBy(dqreConfiguration.rules, 'id', ruleResult.id) || {};

	if (rule.tags) {
		ruleResult.tags = rule.tags;
	}

	ruleResult.nodes.forEach(function (detail) {
		detail.any.forEach(function (check) {
			var data = utils.clone(checksData[check.id] || {});
			if (check.result) {
				data.failureMessage = null;
			}
			utils.extendMetaData(check, data);
		});
		detail.all.forEach(function (check) {
			var data = utils.clone(checksData[check.id] || {});
			if (check.result) {
				data.failureMessage = null;
			}
			utils.extendMetaData(check, data);
		});
		detail.none.forEach(function (check) {
			var data = utils.clone(checksData[check.id] || {});
			if (!check.result) {
				data.failureMessage = null;
			}
			utils.extendMetaData(check, data);
		});
	});
	utils.extendMetaData(ruleResult, utils.clone(rulesData[ruleResult.id] || {}));
};
