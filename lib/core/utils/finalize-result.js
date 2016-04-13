/**
 * Process rule results, grouping them by outcome
 * @param ruleResult {object}
 * @return {object}
 */
axe.utils.finalizeRuleResult = function (ruleResult) {
	Object.assign(ruleResult, axe.utils.aggregateResult(ruleResult.nodes));
	delete ruleResult.nodes;

	return ruleResult;
};
