(function () {

/**
 * Calculates the result of a Rule based on its types and the result of its child Checks
 * @param  {RuleResult} ruleResult The RuleResult to calculate the result of
 */
axe.utils.aggregateRule = function (subResults) {
	let ruleResult = {};

	// For each node, retrieve the result and impact
	subResults = subResults.map(function (subResult) {
		// Known result
		if (subResult.any && subResult.all && subResult.none) {
			return axe.utils.aggregateChecks(subResult);

		} else if (Array.isArray(subResult.node)) {
			return axe.utils.finalizeRuleResult(subResult);

		} else {
			throw new TypeError('Invalid Result type');
		}
	});

	// Aggregate the result
	let resultList = subResults.map((node) => node.result);
	ruleResult.result = axe.utils.aggregate(axe.constants.results, resultList, ruleResult.result);

	// Create an array for each type
	axe.constants.resultGroups
	.forEach((group) => ruleResult[group] = []);

	// Fill the array with nodes
	subResults.forEach(function (subResult) {
		var groupName = axe.constants.resultGroupMap[subResult.result];
		ruleResult[groupName].push(subResult);
	});

	// Take the highest impact of failed rules
	var failGroup = axe.constants.FAIL_GROUP;
	if (ruleResult[failGroup].length > 0) {
		// Get the impact of all violations
		let impactList = ruleResult[failGroup]
		.map((failure) => failure.impact);

		ruleResult.impact = axe.utils.aggregate(axe.constants.impact, impactList) || null;
	} else {
		ruleResult.impact = null;
	}

	return ruleResult;
};

}());