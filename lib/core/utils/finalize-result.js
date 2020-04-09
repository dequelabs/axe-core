import aggregateNodeResults from './aggregateNodeResults';

/**
 * Process rule results, grouping them by outcome
 * @param ruleResult {object}
 * @return {object}
 */
function finalizeRuleResult(ruleResult) {
	Object.assign(ruleResult, aggregateNodeResults(ruleResult.nodes));
	delete ruleResult.nodes;

	return ruleResult;
}

export default finalizeRuleResult;
