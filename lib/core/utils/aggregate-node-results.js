import aggregateChecks from './aggregate-checks';
import aggregate from './aggregate';
import finalizeRuleResult from './finalize-result';

/**
 * Calculates the result of a Rule based on its types and the result of its child Checks
 * @param	{Array} nodeResults The array of nodes tested by the Rule
 */
function aggregateNodeResults(nodeResults) {
	let ruleResult = {};

	// For each node, retrieve the result and impact
	nodeResults = nodeResults.map(function(nodeResult) {
		// Known result
		if (nodeResult.any && nodeResult.all && nodeResult.none) {
			return aggregateChecks(nodeResult);
		} else if (Array.isArray(nodeResult.node)) {
			return finalizeRuleResult(nodeResult);
		} else {
			throw new TypeError('Invalid Result type');
		}
	});

	// Aggregate the result
	// If there were no nodes passed in, mark the test as inapplicable
	if (nodeResults && nodeResults.length) {
		let resultList = nodeResults.map(node => node.result);
		ruleResult.result = aggregate(
			// TODO: es-modules-constants
			axe.constants.results,
			resultList,
			ruleResult.result
		);
	} else {
		ruleResult.result = 'inapplicable';
	}

	// Create an array for each type
	axe.constants.resultGroups.forEach(group => (ruleResult[group] = []));

	// Fill the array with nodes
	nodeResults.forEach(function(nodeResult) {
		var groupName = axe.constants.resultGroupMap[nodeResult.result];
		ruleResult[groupName].push(nodeResult);
	});

	// Take the highest impact of failed or canttell rules
	var impactGroup = axe.constants.FAIL_GROUP;
	if (ruleResult[impactGroup].length === 0) {
		impactGroup = axe.constants.CANTTELL_GROUP;
	}

	if (ruleResult[impactGroup].length > 0) {
		// Get the impact of all issues
		let impactList = ruleResult[impactGroup].map(failure => failure.impact);

		ruleResult.impact = aggregate(axe.constants.impact, impactList) || null;
	} else {
		ruleResult.impact = null;
	}

	return ruleResult;
}

export default aggregateNodeResults;
