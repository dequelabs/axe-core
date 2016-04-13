(function () {

let metaData = axe.constants.raisedMetadata;

/**
 * Calculates the result of a Rule based on its types and the result of its child Checks
 * @param  {RuleResult} ruleResult The RuleResult to calculate the result of
 */
axe.utils.aggregateResult = function (results) {
	let resultObject = {};

	// Aggregate the result
	let resultList = results.map((node) => node.result);
	// resultObject.result = axe.utils.aggregate(metaData.result, resultList, ruleResult.result);

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
		var applicable = false;
		['passes', 'violations', 'inapplicable','cantTell']
		.forEach(function (key) {
			if (Array.isArray(subResult[key]) && subResult[key].length > 0	) {
				applicable = true;
				resultObject[key].push(subResult);
			}
		});
		if (!applicable) {
			resultObject.inapplicable.push(subResult);
		}
	});

	return resultObject;
};

}())
