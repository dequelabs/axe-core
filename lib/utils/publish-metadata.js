
/**
 * Publish metadata from dqre._audit.data
 * @param  {RuleResult} result Result to publish to
 * @private
 */
utils.publishMetaData = function (ruleResult) {
	'use strict';
	var checksData = dqre._audit.data.checks || {};
	var rulesData = dqre._audit.data.rules || {};
	var rule = utils.findBy(dqre._audit.rules, 'id', ruleResult.id) || {};

	ruleResult.tags = utils.clone(rule.tags || []);

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
