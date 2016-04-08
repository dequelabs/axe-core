var max = function (a,b) {
	return Math.max(a,b);
};
var min = function (a,b) {
	return Math.min(a,b);
};

function aggregateResult(aggregateMap, prop, curr, children) {
	'use strict';
	var highestIndex = children.map(function (child) {
		return aggregateMap.indexOf(child[prop]);
		
	}).reduce(function (a, b) {
		return Math.max(a, b);
	}, aggregateMap.indexOf(curr));

	return aggregateMap[highestIndex] || curr;
}

var updateResult = aggregateResult
<<<<<<< HEAD
.bind(null, axe.constants.raisedMetadata.results, 'result')
=======
.bind(null, axe.constants.raisedMetadata.results, 'result');
>>>>>>> origin/feature/cantTell

var updateImpact = aggregateResult
.bind(null, axe.constants.raisedMetadata.impact, 'impact');

/**
 * Calculates the result (PASS or FAIL) of a Node (node-level) or an entire Rule (page-level)
 * @private
 * @param  {Array} checks  Array of checks to calculate the result of
 * @return {String}        Either "PASS" or "FAIL"
 */
function calculateCheckResult(failingChecks) {
	'use strict';
	var isFailing = failingChecks.any.length || failingChecks.all.length || failingChecks.none.length;

	return isFailing ? axe.constants.result.FAIL : axe.constants.result.PASS;
}

axe.utils.getFailingChecks = function (detail) {
	'use strict';

	var any = detail.any.filter(function (check) {
		return check.result === false;
	});
	return {
		all: detail.all.filter(function (check) {
			return check.result === false;
		}),
		any: any.length === detail.any.length ? any : [],
		none: detail.none.filter(function (check) {
			return check.result === true;
		})
	};
};


function mapCeckOutcome(check) {
	var map = axe.constants.raisedMetadata.results
	if (check.result === true) {
		return map.indexOf('passed');
	} else if (check.result === false) {
		return map.indexOf('failed');
	} else {
		return map.indexOf('cantTell');
	}
}

/**
 * Calculates the result of a Rule based on its types and the result of its child Checks
 * @param  {RuleResult} ruleResult The RuleResult to calculate the result of
 */
axe.utils.finalizeRuleResult = function (ruleResult) {
	'use strict';

<<<<<<< HEAD
	// For each node, find out the result of all checks 
	ruleResult.nodes.forEach(function (nodeResult) {
		var resMap = axe.constants.raisedMetadata.results;
		var results = {
			all: nodeResult.all.map(mapCeckOutcome).reduce(max, 0),
			any: nodeResult.any.map(mapCeckOutcome).reduce(min, 4) % 4,
			none: 4 - nodeResult.none.map(mapCeckOutcome).reduce(min, 4)
		};

		console.log(resMap[results.all], resMap[results.any], resMap[results.none], JSON.parse(JSON.stringify(nodeResult)));
=======
	// For each node, find out the result of all checks
	ruleResult.nodes.forEach(function (detail) {
>>>>>>> origin/feature/cantTell

		var failingChecks = axe.utils.getFailingChecks(nodeResult);
		nodeResult.result = calculateCheckResult(failingChecks);

		// On FAIL, return failing elements
		if (nodeResult.result === axe.constants.result.FAIL) {
			nodeResult.impact = updateImpact(nodeResult.impact, axe.utils.getAllChecks(failingChecks));
			Object.assign(nodeResult, failingChecks);

		// On PASS, with any, filter all the checks that didn't pass
		} else {
			nodeResult.any = nodeResult.any.filter(function (check) {
				return check.result === true;
			});
		}

		// Delete the old result property
		['any', 'all', 'none'].forEach(function (prop) {
			nodeResult[prop].forEach(function (check) {
				delete check.result;
			});
		});

		return nodeResult;
	});

	// Create a new rule object
	var newRuleResult = Object.assign({
		violations: [],
		passes: []
	}, ruleResult);

	// Aggregate the result
	newRuleResult.result = updateResult(newRuleResult.result, newRuleResult.nodes);

	// Group each node by it's outcome
	var propertyMap = { PASS: 'passes', 'FAIL': 'violations' };
	newRuleResult.nodes.forEach(function (detail) {
		var prop = propertyMap[detail.result];
		newRuleResult[prop].push(detail);
	});

	delete newRuleResult.nodes;

	// Take the highest impact of failed rules
	newRuleResult.impact = updateImpact(newRuleResult.impact, newRuleResult.violations);
<<<<<<< HEAD

	if (newRuleResult.violations.length) {
		newRuleResult.result = axe.constants.result.FAIL

	} else if (newRuleResult.passes.length) {
		newRuleResult.result = axe.constants.result.PASS

	} else {
		newRuleResult.result = newRuleResult.result
	}
=======
>>>>>>> origin/feature/cantTell

	return newRuleResult;
};
