
function extender(checksData, shouldBeTrue) {
	'use strict';
	return function (check) {
		var sourceData = checksData[check.id] || {};
		var messages = sourceData.messages || {};
		var data = Object.assign({}, sourceData);
		delete data.messages;
		if (check.result === undefined) {
			if (typeof messages.incomplete === 'object') {
				if (check.data && check.data.missingData) {
					var missingReason;
					try {
						missingReason = check.data.missingData[0].reason;
					} finally {
						if (typeof check.data.missingData === 'string')  {
							missingReason = check.data.missingData;
						}
					}
					// return a function with the appropriate message
					data.message = function() { return messages.incomplete[missingReason]; };
				} else {
					// fall back to the default message if no reason specified
					data.message = function() { return messages.incomplete.default; };
				}
			} else {
				// fall back to string message
				data.message = messages.incomplete;
			}
		} else {
			data.message = check.result === shouldBeTrue ? messages.pass : messages.fail;
		}
		axe.utils.extendMetaData(check, data);
	};
}

/**
 * Publish metadata from axe._audit.data
 * @param  {RuleResult} result Result to publish to
 * @private
 */
axe.utils.publishMetaData = function (ruleResult) {
	'use strict';

	var checksData = axe._audit.data.checks || {};
	var rulesData = axe._audit.data.rules || {};
	var rule = axe.utils.findBy(axe._audit.rules, 'id', ruleResult.id) || {};

	ruleResult.tags = axe.utils.clone(rule.tags || []);

	var shouldBeTrue = extender(checksData, true);
	var shouldBeFalse = extender(checksData, false);
	ruleResult.nodes.forEach(function (detail) {
		detail.any.forEach(shouldBeTrue);
		detail.all.forEach(shouldBeTrue);
		detail.none.forEach(shouldBeFalse);
	});
	axe.utils.extendMetaData(ruleResult, axe.utils.clone(rulesData[ruleResult.id] || {}));
};
