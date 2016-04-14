(function () {

let metaData = axe.constants.raisedMetadata;

/**
 * Calculates the result of a Rule based on its types and the result of its child Checks
 * @param  {RuleResult} ruleResult The RuleResult to calculate the result of
 */
axe.utils.aggregateResult = function (results) {
	let resultObject = {};

	// Group each node by it's outcome
	let propertyMap = {
		passed: 'passes',
		failed: 'violations',
		inapplicable: 'inapplicable',
		cantTell: 'cantTell'
	};

	// Create an array for each type
	Object.keys(propertyMap)
	.forEach((type) => resultObject[propertyMap[type]] = []);

	// Fill the array with nodes
	results.forEach(function (subResult) {
		if (subResult.result === 'inapplicable') {
			return resultObject.inapplicable.push(subResult);
		}

		['passes', 'violations', 'inapplicable','cantTell']
		.forEach(function (key) {
			if (Array.isArray(subResult[key]) && subResult[key].length > 0	) {
				var resultCopy = Object.assign({}, subResult);
				resultObject[key].push(resultCopy);
			}
		});
	});

	return resultObject;
};

}())
