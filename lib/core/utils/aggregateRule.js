(function () {

let metaData = axe.constants.raisedMetadata;

/**
 * Calculates the result of a Rule based on its types and the result of its child Checks
 * @param  {RuleResult} ruleResult The RuleResult to calculate the result of
 */
axe.utils.aggregateRule = function (subResults) {
	let ruleResult = {};

	// For each node, retreive the result and impact
	subResults = subResults.map(function (subResult) {
		// Known result
		if (subResult.any && subResult.all && subResult.none) {
			return axe.utils.aggregateChecks(subResult);

		} else if (Array.isArray(subResult.node)) {
			return axe.utils.finalizeRuleResult(subResult);

		} else {
			throw TypeError('Invalid Result type');
		}
	});

	// Aggregate the result
	let resultList = subResults.map((node) => node.result);
	ruleResult.result = axe.utils.aggregate(metaData.result, resultList, ruleResult.result);

	// Group each node by it's outcome
	let propertyMap = {
		passed: 'passes',
		failed: 'violations',
		inapplicable: 'inapplicable',
		cantTell: 'cantTell'
	};

	// Create an array for each type
	Object.keys(propertyMap)
	.forEach((type) => ruleResult[propertyMap[type]] = []);

	// Fill the array with nodes
	subResults.forEach(function (subResult) {
		ruleResult[propertyMap[subResult.result]].push(subResult);
	});

	// Take the highest impact of failed rules
	if (ruleResult.violations.length > 0) {
		// Get the impact of all violations
		let impactList = ruleResult.violations
		.map((violation) => violation.impact);

		ruleResult.impact = axe.utils.aggregate(metaData.impact, impactList) || null;
	} else {
		ruleResult.impact = null;
	}

	return ruleResult;
};

}())
