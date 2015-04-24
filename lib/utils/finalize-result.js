

function raiseMetadata(obj, checks) {
	'use strict';

	Object.keys(dqre.constants.raisedMetadata).forEach(function (key) {
		var collection = dqre.constants.raisedMetadata[key];
		var highestIndex = checks.reduce(function (prevIndex, current) {
		  var currentIndex = collection.indexOf(current[key]);
		  return currentIndex > prevIndex ? currentIndex : prevIndex;
		}, -1);
		if (collection[highestIndex]) {
			obj[key] = collection[highestIndex];
		}
	});

}

/**
 * Calculates the result (PASS or FAIL) of a Node (node-level) or an entire Rule (page-level)
 * @private
 * @param  {Array} checks  Array of checks to calculate the result of
 * @return {String}        Either "PASS" or "FAIL"
 */
function calculateCheckResult(failingChecks) {
	'use strict';
	var isFailing = failingChecks.any.length || failingChecks.all.length || failingChecks.none.length;

	return isFailing ? dqre.constants.result.FAIL : dqre.constants.result.PASS;
}

/**
 * Iterates and calculates the results of each Node and then rolls the result up to the parent RuleResult
 * @private
 * @param  {RuleResult} ruleResult The RuleResult to test
 */
function calculateRuleResult(ruleResult) {
	'use strict';
	function checkMap(check) {
		return utils.extendBlacklist({}, check, ['result']);
	}


	var newRuleResult = utils.extendBlacklist({
		violations: [],
		passes: []
	}, ruleResult, ['nodes']);

	ruleResult.nodes.forEach(function (detail) {

		var failingChecks = utils.getFailingChecks(detail);
		var result = calculateCheckResult(failingChecks);

		if (result === dqre.constants.result.FAIL) {
			raiseMetadata(detail, utils.getAllChecks(failingChecks));
			detail.any = failingChecks.any.map(checkMap);
			detail.all = failingChecks.all.map(checkMap);
			detail.none = failingChecks.none.map(checkMap);
			newRuleResult.violations.push(detail);
			return;
		}

		detail.any = detail.any.filter(function (check) {
			return check.result;
		}).map(checkMap);
		// no need to filter `all` or `none` since we know they all pass
		detail.all = detail.all.map(checkMap);
		detail.none = detail.none.map(checkMap);

		newRuleResult.passes.push(detail);
	});
	raiseMetadata(newRuleResult, newRuleResult.violations);

	newRuleResult.result = newRuleResult.violations.length ? dqre.constants.result.FAIL :
		(newRuleResult.passes.length ? dqre.constants.result.PASS : newRuleResult.result);

	return newRuleResult;
}

utils.getFailingChecks = function (detail) {
	'use strict';

	var any = detail.any.filter(function (check) {
		return !check.result;
	});
	return {
		all: detail.all.filter(function (check) {
			return !check.result;
		}),
		any: any.length === detail.any.length ? any : [],
		none: detail.none.filter(function (check) {
			return !!check.result;
		})
	};
};


/**
 * Calculates the result of a Rule based on its types and the result of its child Checks
 * @param  {RuleResult} ruleResult The RuleResult to calculate the result of
 */
utils.finalizeRuleResult = function (ruleResult) {
	'use strict';

	utils.publishMetaData(ruleResult);
	return calculateRuleResult(ruleResult);
};
