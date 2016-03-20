

/**
 * Publish metadata from axe._audit.data
 * @param  {RuleResult} result Result to publish to
 * @private
 */
axe.utils.publishMetaData = function (ruleResult) {
	'use strict';

	function extender(shouldBeTrue) {
		return function (check) {
			var sourceData = checksData[check.id] || {};
			var messages = sourceData.messages || {};
			var data = axe.utils.extendBlacklist({}, sourceData, ['messages']);
			data.message = check.result === shouldBeTrue ? messages.pass : messages.fail;
			axe.utils.extendMetaData(check, data);
		};
	}

	var checksData = axe._audit.data.checks || {};
	var rulesData = axe._audit.data.rules || {};
	var rule = axe.utils.findBy(axe._audit.rules, 'id', ruleResult.id) || {};

	ruleResult.tags = axe.utils.clone(rule.tags || []);

	var shouldBeTrue = extender(true);
	var shouldBeFalse = extender(false);
	ruleResult.nodes.forEach(function (detail) {
		detail.any.forEach(shouldBeTrue);
		detail.all.forEach(shouldBeTrue);
		detail.none.forEach(shouldBeFalse);
	});
	axe.utils.extendMetaData(ruleResult, axe.utils.clone(rulesData[ruleResult.id] || {}));
};
