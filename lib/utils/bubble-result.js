/**
 * bubbleCheckResult - return PASS/FAIL depending in whether any checks failed
 *
 * @param checks Array
 * @return String
 */
utils.bubbleCheckResult = function bubbleCheckResult(checks) {
	'use strict';
	var results = dqre.constants.result,
		types = dqre.constants.type,
		passes = [],
		i, l, result = results.PASS;

	if (!checks.length) {
		return results.NA;
	}
	for (i = 0, l = checks.length; i < l; i++) {
		if (checks[i].type === types.FAIL) {
			if (checks[i].result) {
				return results.FAIL;
			}
		} else {
			passes.push(checks[i]);
		}
	}
	if (passes.length) {
		// if none of the passes passes, then the result is a fail
		result = results.FAIL;
		for (i = 0, l = passes.length; i < l; i++) {
			if (passes[i].result) {
				return results.PASS;
			}
		}
	}
	return result;
};

/**
 * bubbleRuleResult - returns the most PASS/FAIL depending on whether any instances of the rule failed
 * @param details Array of rule result details
 * @return String
 */
utils.bubbleRuleResult = function bubbleRuleResult(details) {
	'use strict';
	var i,
		result = dqre.constants.result.NA;

	for (i = 0; i < details.length; i++) {
		if (details[i].result === dqre.constants.result.FAIL) {
			result = dqre.constants.result.FAIL;
		} else if (result !== dqre.constants.result.FAIL &&
					details[i].result === dqre.constants.result.PASS) {
			result = dqre.constants.result.PASS;
		}
	}
	return result;
};
