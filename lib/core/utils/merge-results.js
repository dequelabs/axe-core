import nodeSerializer from './node-serializer';
import getAllChecks from './get-all-checks';
import findBy from './find-by';

/**
 * Adds the owning frame's CSS selector onto each instance of DqElement
 * @private
 * @param	{Array} resultSet `nodes` array on a `RuleResult`
 * @param {Object} options Propagated from axe.run/etc
 * @param	{Object} frameSpec The spec describing the owning frame (see nodeSerializer.toSpec)
 */
function pushFrame(resultSet, options, frameSpec) {
  resultSet.forEach(res => {
    res.node = nodeSerializer.mergeSpecs(res.node, frameSpec);
    const checks = getAllChecks(res);

    checks.forEach(check => {
      check.relatedNodes = check.relatedNodes.map(node =>
        nodeSerializer.mergeSpecs(node, frameSpec)
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
 * @param	{Array} frameResults Array of objects including the RuleResults as `results` and
 * owning frame as either an Element `frameElement` or a spec `frameSpec` (see nodeSerializer.toSpec)
 * @param {Object} options Propagated from axe.run/etc
 * @return {Array} The merged RuleResults; should only have one result per rule
 */
function mergeResults(frameResults, options) {
  const mergedResult = [];
  frameResults.forEach(frameResult => {
    const results = normalizeResult(frameResult);
    if (!results || !results.length) {
      return;
    }

    const frameSpec = getFrameSpec(frameResult);
    results.forEach(ruleResult => {
      if (ruleResult.nodes && frameSpec) {
        pushFrame(ruleResult.nodes, options, frameSpec);
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

function getFrameSpec(frameResult) {
  if (frameResult.frameElement) {
    return nodeSerializer.toSpec(frameResult.frameElement);
  } else if (frameResult.frameSpec) {
    return frameResult.frameSpec;
  }
  return null;
}
