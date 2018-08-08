/**
 * Adds the owning frame's CSS selector onto each instance of DqElement
 * @private
 * @param	{Array} resultSet `nodes` array on a `RuleResult`
 * @param	{HTMLElement} frameElement	The frame element
 * @param	{String} frameSelector		 Unique CSS selector for the frame
 */
function pushFrame(resultSet, options, frameElement, frameSelector) {
	'use strict';
	const frameXpath = axe.utils.getXpath(frameElement);
	const frameSpec = {
		element: frameElement,
		selector: frameSelector,
		xpath: frameXpath
	};

	resultSet.forEach(function(res) {
		res.node = axe.utils.DqElement.fromFrame(res.node, options, frameSpec);

		const checks = axe.utils.getAllChecks(res);
		if (checks.length) {
			checks.forEach(function(check) {
				check.relatedNodes = check.relatedNodes.map(node =>
					axe.utils.DqElement.fromFrame(node, options, frameSpec)
				);
			});
		}
	});
}

/**
 * Adds `to` to `from` and then re-sorts by DOM order
 * @private
 * @param	{Array} target	`nodes` array on a `RuleResult`
 * @param	{Array} to	 `nodes` array on a `RuleResult`
 * @return {Array}			The merged and sorted result
 */
function spliceNodes(target, to) {
	'use strict';

	let firstFromFrame = to[0].node,
		sorterResult,
		t;
	for (let i = 0, l = target.length; i < l; i++) {
		t = target[i].node;
		sorterResult = axe.utils.nodeSorter(
			{ actualNode: t.element },
			{ actualNode: firstFromFrame.element }
		);
		if (
			sorterResult > 0 ||
			(sorterResult === 0 && firstFromFrame.selector.length < t.selector.length)
		) {
			target.splice.apply(target, [i, 0].concat(to));
			return;
		}
	}

	target.push.apply(target, to);
}

function normalizeResult(result) {
	'use strict';

	if (!result || !result.results) {
		return null;
	}

	if (!Array.isArray(result.results)) {
		return [result.results];
	}

	if (!result.results.length) {
		return null;
	}

	return result.results;
}

/**
 * Merges one or more RuleResults (possibly from different frames) into one RuleResult
 * @private
 * @param	{Array} frameResults	Array of objects including the RuleResults as `results` and frame as `frame`
 * @return {Array}							The merged RuleResults; should only have one result per rule
 */
axe.utils.mergeResults = function mergeResults(frameResults, options) {
	'use strict';
	const result = [];
	frameResults.forEach(function(frameResult) {
		const results = normalizeResult(frameResult);
		if (!results || !results.length) {
			return;
		}

		results.forEach(function(ruleResult) {
			if (ruleResult.nodes && frameResult.frame) {
				pushFrame(
					ruleResult.nodes,
					options,
					frameResult.frameElement,
					frameResult.frame
				);
			}

			const res = axe.utils.findBy(result, 'id', ruleResult.id);
			if (!res) {
				result.push(ruleResult);
			} else {
				if (ruleResult.nodes.length) {
					spliceNodes(res.nodes, ruleResult.nodes);
				}
			}
		});
	});
	return result;
};
