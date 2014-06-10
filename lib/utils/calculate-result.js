
utils.calculateRuleResult = function (ruleResult) {
	'use strict';

	var calculatedResult;
	ruleResult.details.forEach(function (detail) {
		var result = utils.calculateCheckResult(detail.checks);
		detail.result = result;
		if (calculatedResult !== dqre.constants.type.FAIL) {
			calculatedResult = result;
		}
	});

	if (calculatedResult) {
		ruleResult.result = calculatedResult;
	}
};

utils.calculateCheckResult = function (checks) {
	'use strict';

	var i, l, check,
		result = null,
		hasPasses = false;

	for (i = 0, l = checks.length; i < l; i++) {
		check = checks[i];
		if (check.result && check.type === dqre.constants.type.FAIL) {
			return dqre.constants.type.FAIL;
		} else if (check.type === dqre.constants.type.PASS) {
			hasPasses = true;
			if (check.result) {
				result = dqre.constants.type.PASS;
			}
		}
	}
	if (!result && hasPasses) {
		result = dqre.constants.type.FAIL;
	}

	return result;
};
