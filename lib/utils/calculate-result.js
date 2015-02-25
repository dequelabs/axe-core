
/**
 * Calculates the result (PASS or FAIL) of a Node (node-level) or an entire Rule (page-level)
 * @private
 * @param  {Array} checks  Array of checks to calculate the result of
 * @return {String}        Either "PASS" or "FAIL"
 */
function calculateCheckResult(detail) {
	'use strict';

	var isFailing = detail.any.some(function (check) {
			return !check.result;
		}) && detail.all.every(function (check) {
			return !check.result;
		}) && detail.none.every(function (check) {
			return !!check.result;
		});

	return isFailing ? dqre.constants.result.FAIL : dqre.constants.result.PASS;
}

/**
 * Iterates and calculates the results of each Node and then rolls the result up to the parent RuleResult
 * @private
 * @param  {RuleResult} ruleResult The RuleResult to test
 */
function calculateNodeRuleResult(ruleResult) {
	'use strict';

	var calculatedResult,
		hasFailure = false;
	ruleResult.nodes.forEach(function (detail) {
		var result = calculateCheckResult(detail);
		detail.result = result;
		if (calculatedResult !== dqre.constants.result.FAIL) {
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

	var checks = {
		any: [],
		all: [],
		none: []
	};
	ruleResult.nodes.forEach(function (detail) {
		checks.any.push.apply(checks.any, detail.any);
		checks.all.push.apply(checks.all, detail.all);
		checks.none.push.apply(checks.none, detail.none);
	});
	var calculatedResult = calculateCheckResult(checks);

	if (calculatedResult) {
		ruleResult.result = calculatedResult;
	}

}

/**
 * Determine if an individual check result has "failed" and as such; should have a failureMessage
 * @param  {CheckResult}  checkResult
 * @return {Boolean}      Whether the check failed
 */
utils.isCheckFailing = function (checkResult) {
	'use strict';

	return (checkResult.type === dqre.constants.result.FAIL && !!checkResult.result) ||
		(checkResult.type === dqre.constants.result.PASS && !checkResult.result);
};

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
