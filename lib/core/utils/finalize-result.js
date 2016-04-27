/**
 * Process rule results, grouping them by outcome
 * @param ruleResult {object}
 * @return {object}
 */
axe.utils.finalizeRuleResult = function (ruleResult) {
	Object.assign(ruleResult, axe.utils.aggregateRule(ruleResult.nodes));
	delete ruleResult.nodes;

	return ruleResult;
};
