import aggregateNodeResults from './aggregate-node-results';

/**
 * Process rule results, grouping them by outcome
 * @param ruleResult {object}
 * @return {object}
 */
function finalizeResult(ruleResult) {
	Object.assign(ruleResult, aggregateNodeResults(ruleResult.nodes));
	delete ruleResult.nodes;

	return ruleResult;
}

export default finalizeResult;
