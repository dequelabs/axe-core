import DqElement from './dq-element';
import getAllChecks from './get-all-checks';
import findBy from './find-by';

/**
 * Adds the owning frame's CSS selector onto each instance of DqElement
 * @private
 * @param	{Array} resultSet `nodes` array on a `RuleResult`
 * @param	{HTMLElement} frameElement	The frame element
 * @param	{String} frameSelector		 Unique CSS selector for the frame
 */
function pushFrame(resultSet, dqFrame, options) {
  resultSet.forEach(res => {
    res.node = DqElement.fromFrame(res.node, options, dqFrame);
    const checks = getAllChecks(res);

    checks.forEach(check => {
      check.relatedNodes = check.relatedNodes.map(node =>
        DqElement.fromFrame(node, options, dqFrame)
      );
    });
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
  const firstFromFrame = to[0].node;
  for (let i = 0; i < target.length; i++) {
    const node = target[i].node;
    const resultSort = nodeIndexSort(
      node.nodeIndexes,
      firstFromFrame.nodeIndexes
    );
    if (
      resultSort > 0 ||
      (resultSort === 0 &&
        firstFromFrame.selector.length < node.selector.length)
    ) {
      target.splice(i, 0, ...to);
      return;
    }
  }
  target.push(...to);
}

function normalizeResult(result) {
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
function mergeResults(frameResults, options) {
  const mergedResult = [];
  frameResults.forEach(frameResult => {
    const results = normalizeResult(frameResult);
    if (!results || !results.length) {
      return;
    }

    let dqFrame;
    if (frameResult.frameElement) {
      const spec = { selector: [frameResult.frame] };
      dqFrame = new DqElement(frameResult.frameElement, options, spec);
    }

    results.forEach(ruleResult => {
      if (ruleResult.nodes && dqFrame) {
        pushFrame(ruleResult.nodes, dqFrame, options);
      }

      var res = findBy(mergedResult, 'id', ruleResult.id);
      if (!res) {
        mergedResult.push(ruleResult);
      } else {
        if (ruleResult.nodes.length) {
          spliceNodes(res.nodes, ruleResult.nodes);
        }
      }
    });
  });

  // Sort results in DOM order
  mergedResult.forEach(result => {
    if (result.nodes) {
      result.nodes.sort((nodeA, nodeB) => {
        return nodeIndexSort(nodeA.node.nodeIndexes, nodeB.node.nodeIndexes);
      });
    }
  });
  return mergedResult;
}

function nodeIndexSort(nodeIndexesA = [], nodeIndexesB = []) {
  const length = Math.max(nodeIndexesA?.length, nodeIndexesB?.length);
  for (let i = 0; i < length; i++) {
    const indexA = nodeIndexesA?.[i];
    const indexB = nodeIndexesB?.[i];
    if (typeof indexA !== 'number' || isNaN(indexA)) {
      // Empty arrays go at the end, otherwise shortest array first
      return i === 0 ? 1 : -1;
    }
    if (typeof indexB !== 'number' || isNaN(indexB)) {
      return i === 0 ? -1 : 1;
    }
    if (indexA !== indexB) {
      return indexA - indexB;
    }
  }
  return 0;
}

export default mergeResults;
