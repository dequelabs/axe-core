/**
 * Calculates the result of a Rule based on its types and the result of its child Checks
 * @param  {RuleResult} ruleResult The RuleResult to calculate the result of
 */
axe.utils.aggregateResult = function (results) {
	let resultObject = {};

	// Create an array for each type
	axe.constants.resultGroups
	.forEach((groupName) => resultObject[groupName] = []);

	// Fill the array with nodes
	results.forEach(function (subResult) {
		if (subResult.result === axe.constants.NA) {
			return resultObject[axe.constants.NA_GROUP].push(subResult);
		}

		axe.constants.resultGroups
		.forEach(function (key) {
			if (Array.isArray(subResult[key]) && subResult[key].length > 0	) {
				var resultCopy = Object.assign({}, subResult);
				resultObject[key].push(resultCopy);
			}
		});
	});

	return resultObject;
};
