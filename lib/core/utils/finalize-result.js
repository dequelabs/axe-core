/**
 * Map over the any / all / none properties
 */
let checkTypes = ['any', 'all', 'none'];
function anyAllNone(obj, functor) {
	return checkTypes.reduce(function (out, type) {
		out[type] = (obj[type] || []).map((val) => functor(val, type));
		return out;
	}, {});
}


/**
 * From a list of values, find the one with the greatest weight according to
 * the supplied map
 * @param  {object} params Contains 3 properties:
 * - map: a map indicating the order of values to run in
 *        example: ['small', 'medium', 'large']
 * - values: Array of values to take the highest from
 * - initial: optional starting value
 */
function aggregate(map, values, initial) {
	values = values.slice();
	if (initial) {
		values.push(initial);
	}

	return values.sort((a, b) => {
		return map.indexOf(a) > map.indexOf(b);
	}).pop();
}


let metaData = axe.constants.raisedMetadata;
let checkMap = [];
checkMap[metaData.result.indexOf('passed')] = true;
checkMap[metaData.result.indexOf('failed')] = false;
checkMap[metaData.result.indexOf('cantTell')] = null;


axe.utils.aggregateChecks = function (nodeResOriginal) {
	// Create a copy
	let nodeResult = Object.assign({}, nodeResOriginal);

	// map each result value to a result index
	anyAllNone(nodeResult, function (check, type) {
		let i = checkMap.indexOf(check.result);
		check.result = i !== -1 ? i : metaData.result.indexOf('cantTell');

		if (type === 'none') {
			// For none, reverse the outcome
			check.result = 4 - check.result;
		}
	});

	// Find the highest index of the result types
	let results = anyAllNone(nodeResult, (c) => c.result);
	nodeResult.result = Math.max(
		results.all.reduce((a, b) => Math.max(a,b), 0),
		results.none.reduce((a, b) => Math.max(a,b), 0),
		// get the lowest passing of 'any' defaulting
		// to 0 by wrapping around 4 to 0 (inapplicable)
		results.any.reduce((a, b) => Math.min(a,b), 4) % 4
	);

	// Of each type, filter out all results not matching the final result
	let impacts = [];
	checkTypes.forEach((type) => {
		nodeResult[type] = nodeResult[type].filter((check) => {
			return check.result === nodeResult.result;
		});
		nodeResult[type].forEach((check) => impacts.push(check.impact));
	});

	// for failed nodes, define the impact
	if (nodeResult.result === metaData.result.indexOf('failed')) {
		nodeResult.impact = aggregate(metaData.impact, impacts);
	}

	// Delete the old result property
	anyAllNone(nodeResult, (c) => delete c.result);

	// Convert the index to a result string value
	nodeResult.result = metaData.result[nodeResult.result];

	return nodeResult;
}



/**
 * Calculates the result of a Rule based on its types and the result of its child Checks
 * @param  {RuleResult} ruleResult The RuleResult to calculate the result of
 */
axe.utils.aggregateResult = function (subResults) {
	let ruleResult = {};

	// For each node, retreive the result and impact
	subResults = subResults.map(function (subResult) {
		// Known result
		if (metaData.result.indexOf(subResult.result) !== -1) {
			return subResult;

		} else if (subResult.any && subResult.all && subResult.none) {
			return axe.utils.aggregateChecks(subResult);

		} else if (Array.isArray(subResult.node)) {
			console.log(subResult.node);
			return axe.utils.finalizeRuleResult(subResult);

		} else {
			console.log(subResult);
			throw TypeError('Invalid Result type');
		}
	});

	// Aggregate the result
	let resultList = subResults.map((node) => node.result);
	ruleResult.result = aggregate(metaData.result, resultList, ruleResult.result);

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
	subResults.forEach(function (nodeResult) {
		ruleResult[propertyMap[nodeResult.result]].push(nodeResult);
	});

	// Take the highest impact of failed rules
	if (ruleResult.violations.length > 0) {
		// Get the impact of all violations
		let impactList = ruleResult.violations
		.map((violation) => violation.impact);

		ruleResult.impact = aggregate(metaData.impact, impactList) || null;
	} else {
		ruleResult.impact = null;
	}

	return ruleResult;
};



axe.utils.finalizeRuleResult = function (ruleResult) {
	Object.assign(ruleResult, axe.utils.aggregateResult(ruleResult.nodes));
	delete ruleResult.nodes;

	return ruleResult;
};

