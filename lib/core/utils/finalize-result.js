
function aggregateResult(aggregateMap, prop, curr, children) {
	'use strict';
	var highestIndex = children.map(function (child) {
		return aggregateMap.indexOf(child[prop]);

	}).reduce(Math.max, aggregateMap.indexOf(curr));

	return aggregateMap[highestIndex] || curr;
}

var updateImpact = aggregateResult
.bind(null, axe.constants.raisedMetadata.impact, 'impact');

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

	newRuleResult.nodes = ruleResult.nodes.map(function (detail) {
		var failingChecks = axe.utils.getFailingChecks(detail);
		detail.result = calculateCheckResult(failingChecks);

		var checks;
		if (detail.result === axe.constants.result.FAIL) {
			detail.impact = updateImpact(detail.impact, axe.utils.getAllChecks(failingChecks));
			checks = failingChecks;

		} else {
			detail.any = detail.any.filter(function (check) {
				return check.result;
			})
			checks = detail;
		}
		detail.any = checks.any.map(checkMap);
		detail.all = checks.all.map(checkMap);
		detail.none = checks.none.map(checkMap);
		return detail;
	});

	var propertyMap = { PASS: 'passes', 'FAIL': 'violations' };
	newRuleResult.nodes.forEach(function (detail) {
		var prop = propertyMap[detail.result];
		if (newRuleResult[prop]) {
			newRuleResult[prop].push(detail);
		}
	});
	delete newRuleResult.nodes;

	newRuleResult.impact = updateImpact(newRuleResult.impact, newRuleResult.violations);

	if (newRuleResult.violations.length) {
		newRuleResult.result = axe.constants.result.FAIL

	} else if (newRuleResult.passes.length) {
		newRuleResult.result = axe.constants.result.PASS

	} else {
		newRuleResult.result = newRuleResult.result
	}

	return newRuleResult;
};
