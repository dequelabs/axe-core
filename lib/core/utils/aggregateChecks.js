let checkMap = [];
checkMap[axe.constants.PASS_PRIO] = true;
checkMap[axe.constants.CANTTELL_PRIO] = null;
checkMap[axe.constants.FAIL_PRIO] = false;


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

	// map each result value to a priority
	anyAllNone(nodeResult, function (check, type) {
		let i = checkMap.indexOf(check.result);
		// default to cantTell
		check.priority = i !== -1 ? i : axe.constants.CANTTELL_PRIO;

		if (type === 'none') {
			// For none, reverse the outcome
			check.priority = 4 - check.priority;
		}
	});

	// Find the result with the highest priority
	let priorities = anyAllNone(nodeResult, (c) => c.priority);
	nodeResult.priority = Math.max(
		priorities.all.reduce((a, b) => Math.max(a,b), 0),
		priorities.none.reduce((a, b) => Math.max(a,b), 0),
		// get the lowest passing of 'any' defaulting
		// to 0 by wrapping around 4 to 0 (inapplicable)
		priorities.any.reduce((a, b) => Math.min(a,b), 4) % 4
	);

	// Of each type, filter out all results not matching the final priority
	let impacts = [];
	checkTypes.forEach((type) => {
		nodeResult[type] = nodeResult[type].filter((check) => {
			return check.priority === nodeResult.priority;
		});
		nodeResult[type].forEach((check) => impacts.push(check.impact));
	});


	// for failed nodes, define the impact
	if (nodeResult.priority === axe.constants.FAIL_PRIO) {
		nodeResult.impact = axe.utils.aggregate(axe.constants.impact, impacts);
	} else {
		nodeResult.impact = null;
	}

	// Delete the old result and priority properties
	anyAllNone(nodeResult, (c) => {
		delete c.result;
		delete c.priority;
	});

	// Convert the index to a result string value
	nodeResult.result = axe.constants.results[nodeResult.priority];
	delete nodeResult.priority;

	return nodeResult;
};