
function aggregateResult(aggregateMap, prop, curr, children) {
	'use strict';
	var highestIndex = children.map(function (child) {
		return aggregateMap.indexOf(child[prop]);

	}).reduce(function (a, b) {
		return Math.max(a, b);
	}, aggregateMap.indexOf(curr));

	return aggregateMap[highestIndex] || curr;
}

var updateResult = aggregateResult
.bind(null, axe.constants.raisedMetadata.results, 'result');

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
		return check.result === false;
	});
	return {
		all: detail.all.filter(function (check) {
			return check.result === false;
		}),
		any: any.length === detail.any.length ? any : [],
		none: detail.none.filter(function (check) {
			return check.result === true;
		})
	};
};



/**
 * Calculates the result of a Rule based on its types and the result of its child Checks
 * @param  {RuleResult} ruleResult The RuleResult to calculate the result of
 */
axe.utils.finalizeRuleResult = function (ruleResult) {
	'use strict';

	// For each node, find out the result of all checks
	ruleResult.nodes.forEach(function (detail) {

		var failingChecks = axe.utils.getFailingChecks(detail);
		detail.result = calculateCheckResult(failingChecks);

		// On FAIL, return failing elements
		if (detail.result === axe.constants.result.FAIL) {
			detail.impact = updateImpact(detail.impact, axe.utils.getAllChecks(failingChecks));
			Object.assign(detail, failingChecks);

		// On PASS, with any, filter all the checks that didn't pass
		} else {
			detail.any = detail.any.filter(function (check) {
				return check.result === true;
			});
		}

		// Delete the old result property
		['any', 'all', 'none'].forEach(function (prop) {
			detail[prop].forEach(function (check) {
				delete check.result;
			});
		});

		return detail;
	});

	// Create a new rule object
	var newRuleResult = Object.assign({
		violations: [],
		passes: []
	}, ruleResult);

	// Aggregate the result
	newRuleResult.result = updateResult(newRuleResult.result, newRuleResult.nodes);

	// Group each node by it's outcome
	var propertyMap = { PASS: 'passes', 'FAIL': 'violations' };
	newRuleResult.nodes.forEach(function (detail) {
		var prop = propertyMap[detail.result];
		newRuleResult[prop].push(detail);
	});

	delete newRuleResult.nodes;

	// Take the highest impact of failed rules
	newRuleResult.impact = updateImpact(newRuleResult.impact, newRuleResult.violations);

	return newRuleResult;
};
