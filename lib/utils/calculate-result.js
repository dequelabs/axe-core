
function splitResultNodes(ruleResult) {
	'use strict';

	var result = {
		violations: [],
		passes: []
	};
	Object.keys(ruleResult).forEach(function (key) {
		if (key !== 'nodes') {
			result[key] = ruleResult[key];
		}
	});
	if (ruleResult.pageLevel) {
		result[ruleResult.result === dqre.constants.result.FAIL ? 'violations' : 'passes'] = ruleResult.nodes;
		return result;
	}
	ruleResult.nodes.forEach(function (node) {
		if (node.result === dqre.constants.result.FAIL) {
			result.violations.push(node);
		} else {
			result.passes.push(node);
		}
	});
	return result;
}


function raiseMetadata(obj, checks) {
	'use strict';

	Object.keys(dqre.constants.raisedMetadata).forEach(function (key) {
		var collection = dqre.constants.raisedMetadata[key];
		var highestIndex = checks.reduce(function (prevIndex, current) {
		  var currentIndex = collection.indexOf(current[key]);
		  return currentIndex > prevIndex ? currentIndex : prevIndex;
		}, -1);
		if (collection[highestIndex]) {
			obj[key] = collection[highestIndex];
		}
	});

}

/**
 * Calculates the result (PASS or FAIL) of a Node (node-level) or an entire Rule (page-level)
 * @private
 * @param  {Array} checks  Array of checks to calculate the result of
 * @return {String}        Either "PASS" or "FAIL"
 */
function calculateCheckResult(failingChecks) {
	'use strict';
	var isFailing = failingChecks.any.length || failingChecks.all.length || failingChecks.none.length;

	return isFailing ? dqre.constants.result.FAIL : dqre.constants.result.PASS;
}

/**
 * Iterates and calculates the results of each Node and then rolls the result up to the parent RuleResult
 * @private
 * @param  {RuleResult} ruleResult The RuleResult to test
 */
function calculateNodeRuleResult(ruleResult) {
	'use strict';

	var calculatedResult;
	ruleResult.nodes.forEach(function (detail) {
		var failingChecks = utils.getFailingChecks(detail);
		var result = calculateCheckResult(failingChecks);
		detail.result = result;

		if (result === dqre.constants.result.FAIL) {
			raiseMetadata(detail, utils.getAllChecks(failingChecks));
		}

		if (calculatedResult !== dqre.constants.result.FAIL) {
			calculatedResult = result;
		}
	});

	raiseMetadata(ruleResult, ruleResult.nodes);

	if (calculatedResult) {
		ruleResult.result = calculatedResult;
	}
	return splitResultNodes(ruleResult);
}


/**
 * Merges all Checks together and then calculates the result of Checks for Page-Level rules
 * @private
 * @param  {RuleResult} ruleResult The RuleResult to test
 */
function calculatePageRuleResult(ruleResult) {
	'use strict';

	var checks = {
		any: [],
		all: [],
		none: []
	};
	ruleResult.nodes.forEach(function (detail) {
		checks.any.push.apply(checks.any, detail.any);
		checks.all.push.apply(checks.all, detail.all);
		checks.none.push.apply(checks.none, detail.none);
	});
	var failingChecks = utils.getFailingChecks(checks);
	var calculatedResult = calculateCheckResult(failingChecks);
	raiseMetadata(ruleResult, utils.getAllChecks(failingChecks));

	if (calculatedResult) {
		ruleResult.result = calculatedResult;
	}

	return splitResultNodes(ruleResult);
}

utils.getFailingChecks = function (detail) {
	'use strict';

	var any = detail.any.filter(function (check) {
		return !check.result;
	});
	return {
		all: detail.all.filter(function (check) {
			return !check.result;
		}),
		any: any.length === detail.any.length ? any : [],
		none: detail.none.filter(function (check) {
			return !!check.result;
		})
	};
};


/**
 * Calculates the result of a Rule based on its types and the result of its child Checks
 * @param  {RuleResult} ruleResult The RuleResult to calculate the result of
 */
utils.finalizeRuleResult = function (ruleResult) {
	'use strict';

	utils.publishMetaData(ruleResult);
	if (ruleResult.pageLevel) {
		return calculatePageRuleResult(ruleResult);
	}
	return calculateNodeRuleResult(ruleResult);
};
