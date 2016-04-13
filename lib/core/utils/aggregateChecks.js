let metaData = axe.constants.raisedMetadata;
let checkMap = [];
checkMap[metaData.result.indexOf('passed')] = true;
checkMap[metaData.result.indexOf('failed')] = false;
checkMap[metaData.result.indexOf('cantTell')] = null;


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
		nodeResult.impact = axe.utils.aggregate(metaData.impact, impacts);
	}

	// Delete the old result property
	anyAllNone(nodeResult, (c) => delete c.result);

	// Convert the index to a result string value
	nodeResult.result = metaData.result[nodeResult.result];

	return nodeResult;
};