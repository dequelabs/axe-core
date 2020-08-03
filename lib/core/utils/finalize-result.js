import aggregateNodeResults from './aggregate-node-results';

/**
 * Process rule results, grouping them by outcome
 * @param ruleResult {object}
 * @return {object}
 */
function finalizeRuleResult(ruleResult) {
	const rule = axe._audit.rules.find(rule => rule.id === ruleResult.id);
	if (rule && rule.impact) {
		ruleResult.nodes.forEach(node => {
			['any', 'all', 'none'].forEach(checkType => {
				(node[checkType] || []).forEach(checkResult => {
					checkResult.impact = rule.impact;
				});
			});
		});
	}

	Object.assign(ruleResult, aggregateNodeResults(ruleResult.nodes));
	delete ruleResult.nodes;

	return ruleResult;
}

export default finalizeRuleResult;
