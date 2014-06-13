
/**
 * Calculates the result (PASS or FAIL) of a Node (node-level) or an entire Rule (page-level)
 * @param  {Array} checks  Array of checks to calculate the result of
 * @return {String}        Either "PASS" or "FAIL"
 */
function calculateCheckResult(checks) {
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
}

/**
 * Iterates and calculates the results of each Node and then rolls the result up to the parent RuleResult
 * @private
 * @param  {RuleResult} ruleResult The RuleResult to test
 */
function calculateNodeRuleResult(ruleResult) {
	'use strict';

	var calculatedResult;
	ruleResult.details.forEach(function (detail) {
		var result = calculateCheckResult(detail.checks);
		detail.result = result;
		if (calculatedResult !== dqre.constants.type.FAIL) {
			calculatedResult = result;
		}
	});

	if (calculatedResult) {
		ruleResult.result = calculatedResult;
	}

}


/**
 * Merges all Checks together and then calculates the result of Checks for Page-Level rules
 * @private
 * @param  {RuleResult} ruleResult The RuleResult to test
 */
function calculatePageRuleResult(ruleResult) {
	'use strict';

	var checks = [];
	ruleResult.details.forEach(function (detail) {
		checks.push.apply(checks, detail.checks);
	});
	var calculatedResult = calculateCheckResult(checks);

	if (calculatedResult) {
		ruleResult.result = calculatedResult;
	}

}

/**
 * Calculates the result of a Rule based on its types and the result of its child Checks
 * @param  {RuleResult} ruleResult The RuleResult to calculate the result of
 */
utils.calculateRuleResult = function (ruleResult) {
	'use strict';

	if (ruleResult.pageLevel) {
		calculatePageRuleResult(ruleResult);
	} else {
		calculateNodeRuleResult(ruleResult);
	}
};
