


function calculateNodeRuleResult(ruleResult) {
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

}


function calculatePageRuleResult(ruleResult) {
	'use strict';

	var checks = [];
	ruleResult.details.forEach(function (detail) {
		checks.concat(detail.checks);
	});
	var calculatedResult = utils.calculateCheckResult(checks);

	if (calculatedResult) {
		ruleResult.result = calculatedResult;
	}

}

utils.calculateRuleResult = function (ruleResult) {
	'use strict';

	if (ruleResult.pageLevel) {
		calculatePageRuleResult(ruleResult);
	} else {
		calculateNodeRuleResult(ruleResult);
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
		return dqre.constants.type.FAIL;
	}

	return result ||  dqre.constants.type.PASS;
};
