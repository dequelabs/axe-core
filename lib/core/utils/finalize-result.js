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
function aggregate(params) {
	let { initial, values, map } =  params;
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


function getNormalizedNode(nodeResOriginal) {
	// Create a copy
	let {...nodeResult} = nodeResOriginal;
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
	checkTypes.forEach((type) => {
		nodeResult[type] = nodeResult[type].filter((check) => {
			return check.result === nodeResult.result;
		});
	});

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
axe.utils.finalizeRuleResult = function (ruleResultOriginal) {
	// Create a new rule object
	let {...ruleResult} = ruleResultOriginal;

	// For each node, find out the result of all checks
	ruleResult.nodes = ruleResult.nodes.map(getNormalizedNode);

	// Aggregate the result
	var result = aggregate({
		initial: ruleResult.result,
		values: ruleResult.nodes.map((node) => node.result),
		map: metaData.result,
		log: true
	});
	ruleResult.result = result;

	// Group each node by it's outcome
	let propertyMap = { passed: 'passes', 'failed': 'violations' };
	ruleResult.nodes.forEach(function (nodeResult) {
		let prop = propertyMap[nodeResult.result];
		if (!ruleResult[prop]) {
			ruleResult[prop] = [];
		}
		ruleResult[prop].push(nodeResult);
	});

	delete ruleResult.nodes;

	// Take the highest impact of failed rules
	if (ruleResult.violations) {
		ruleResult.impact = aggregate({
			initial: ruleResult.impact,
			values: ruleResult.violations.map((res) => res.impact),
			map: metaData.impact
		});

	} else {
		ruleResult.impact = null;
	}
	console.log(ruleResult);
	return ruleResult;
};
