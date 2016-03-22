

function raiseMetadata(obj, checks) {
	'use strict';

	Object.keys(axe.constants.raisedMetadata)
	.forEach(function (key) {
		var collection = axe.constants.raisedMetadata[key];
		var highestIndex = checks.reduce(function (prevIndex, current) {
		  var currentIndex = collection.indexOf(current[key]);
		  return currentIndex > prevIndex ? currentIndex : prevIndex;
		}, -1);
		if (collection[highestIndex]) {
			obj[key] = collection[highestIndex];
		}
	});

}

function updateImpact(curr, next) {
	var impactMap = axe.constants.raisedMetadata.impact;
	var highestIndex = Math.max(impactMap.indexOf(curr), impactMap.indexOf(next));
	return impactMap[highestIndex];
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

	return isFailing ? axe.constants.result.FAIL : axe.constants.result.PASS;
}

axe.utils.getFailingChecks = function (detail) {
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
axe.utils.finalizeRuleResult = function (ruleResult) {
	'use strict';

	function checkMap(check) {
		var obj = Object.assign({}, check);
		delete obj.result;
		return obj;
	}

	var newRuleResult = Object.assign({
		violations: [],
		passes: []
	}, ruleResult);
	delete newRuleResult.nodes;

	ruleResult.nodes.forEach(function (detail) {
		var failingChecks = axe.utils.getFailingChecks(detail);
		detail.result = calculateCheckResult(failingChecks);

		if (detail.result === axe.constants.result.FAIL) {
			raiseMetadata(detail, axe.utils.getAllChecks(failingChecks));
			detail.any = failingChecks.any.map(checkMap);
			detail.all = failingChecks.all.map(checkMap);
			detail.none = failingChecks.none.map(checkMap);
			newRuleResult.violations.push(detail);

		} else {
			detail.any = detail.any.filter(function (check) {
				return check.result;
			}).map(checkMap);
			// no need to filter `all` or `none` since we know they all pass
			detail.all = detail.all.map(checkMap);
			detail.none = detail.none.map(checkMap);

			newRuleResult.passes.push(detail);
		}
	});
	raiseMetadata(newRuleResult, newRuleResult.violations);

	if (newRuleResult.violations.length) {
		newRuleResult.result = axe.constants.result.FAIL

	} else if (newRuleResult.passes.length) {
		newRuleResult.result = axe.constants.result.PASS

	} else {
		newRuleResult.result = newRuleResult.result
	}

	return newRuleResult;
};
