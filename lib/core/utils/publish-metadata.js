/*global helpers */
/**
 * Construct incomplete message from check.data
 * @param  {Object} checkData Check result with reason specified
 * @param  {Object} messages Source data object with message options
 * @return  {String}
 * @private
 */
function getIncompleteReason(checkData, messages) {
	function getDefaultMsg(messages) {
		if (messages.incomplete && messages.incomplete.default) {
			// fall back to the default message if no reason specified
			return messages.incomplete.default;
		} else {
			return helpers.incompleteFallbackMessage();
		}
	}
	if (checkData && checkData.missingData) {
		try {
			var msg = messages.incomplete[checkData.missingData[0].reason];
			if (!msg) {
				throw new Error();
			}
			return msg;
		} catch (e) {
			if (typeof checkData.missingData === 'string') {
				// return a string with the appropriate reason
				return messages.incomplete[checkData.missingData];
			} else {
				return getDefaultMsg(messages);
			}
		}
	} else {
		return getDefaultMsg(messages);
	}
}
/**
 * Extend checksData with the correct result message
 * @param  {Object} checksData The check result data
 * @param  {Boolean} shouldBeTrue Result of pass/fail check run
 * @return {Function}
 * @private
 */
function extender(checksData, shouldBeTrue) {
	'use strict';
	return function(check) {
		var sourceData = checksData[check.id] || {};
		var messages = sourceData.messages || {};
		var data = Object.assign({}, sourceData);
		delete data.messages;
		if (check.result === undefined) {
			if (typeof messages.incomplete === 'object') {
				data.message = function() {
					return getIncompleteReason(check.data, messages);
				};
			} else {
				// fall back to string function
				data.message = messages.incomplete;
			}
		} else {
			data.message =
				check.result === shouldBeTrue ? messages.pass : messages.fail;
		}
		axe.utils.extendMetaData(check, data);
	};
}

/**
 * Publish metadata from axe._audit.data
 * @param  {RuleResult} result Result to publish to
 * @private
 */
axe.utils.publishMetaData = function(ruleResult) {
	'use strict';

	var checksData = axe._audit.data.checks || {};
	var rulesData = axe._audit.data.rules || {};
	var rule = axe.utils.findBy(axe._audit.rules, 'id', ruleResult.id) || {};

	ruleResult.tags = axe.utils.clone(rule.tags || []);

	var shouldBeTrue = extender(checksData, true);
	var shouldBeFalse = extender(checksData, false);
	ruleResult.nodes.forEach(function(detail) {
		detail.any.forEach(shouldBeTrue);
		detail.all.forEach(shouldBeTrue);
		detail.none.forEach(shouldBeFalse);
	});
	axe.utils.extendMetaData(
		ruleResult,
		axe.utils.clone(rulesData[ruleResult.id] || {})
	);
};
