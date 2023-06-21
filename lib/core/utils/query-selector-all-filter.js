import cache from '../base/cache';
import { matchesExpression, convertSelector } from './matches';
import { getNodesMatchingExpression } from './selector-cache';

function createLocalVariables(
  vNodes,
  anyLevel,
  thisLevel,
  parentShadowId,
  recycledLocalVariable
) {
  const retVal = recycledLocalVariable || {};

  retVal.vNodes = vNodes;
  retVal.vNodesIndex = 0;
  retVal.anyLevel = anyLevel;
  retVal.thisLevel = thisLevel;
  retVal.parentShadowId = parentShadowId;

  return retVal;
}

function matchExpressions(domTree, expressions, filter) {
  /**
   * Allocating new objects in createLocalVariables is quite expensive given
   * that matchExpressions is in the hot path.
   *
   * Keep track of previously allocated objects to avoid useless allocations
   * and garbage collection. This is intentionally shared between calls of
   * matchExpressions.
   */
  const recycledLocalVariables = cache.get(
    'qsa.recycledLocalVariables',
    () => []
  );

  const stack = [];
  const vNodes = Array.isArray(domTree) ? domTree : [domTree];
  let currentLevel = createLocalVariables(
    vNodes,
    expressions,
    null,
    domTree[0].shadowId,
    recycledLocalVariables.pop()
  );
  const result = [];

  while (currentLevel.vNodesIndex < currentLevel.vNodes.length) {
    const vNode = currentLevel.vNodes[currentLevel.vNodesIndex++];
    let childOnly = null; // we will add hierarchical '>' selectors here
    let childAny = null;
    const combinedLength =
      (currentLevel.anyLevel?.length || 0) +
      (currentLevel.thisLevel?.length || 0);
    let added = false;
    // see if node matches
    for (let i = 0; i < combinedLength; i++) {
      const exp =
        i < (currentLevel.anyLevel?.length || 0)
          ? currentLevel.anyLevel[i]
          : currentLevel.thisLevel[i - (currentLevel.anyLevel?.length || 0)];
      if (
        (!exp[0].id || vNode.shadowId === currentLevel.parentShadowId) &&
        matchesExpression(vNode, exp[0])
      ) {
        if (exp.length === 1) {
          if (!added && (!filter || filter(vNode))) {
            result.push(vNode);
            added = true;
          }
        } else {
          const rest = exp.slice(1);
          if ([' ', '>'].includes(rest[0].combinator) === false) {
            throw new Error(
              'axe.utils.querySelectorAll does not support the combinator: ' +
                exp[1].combinator
            );
          }
          if (rest[0].combinator === '>') {
            // add the rest to the childOnly array
            (childOnly = childOnly || []).push(rest);
          } else {
            // add the rest to the childAny array
            (childAny = childAny || []).push(rest);
          }
        }
      }
      if (
        (!exp[0].id || vNode.shadowId === currentLevel.parentShadowId) &&
        currentLevel.anyLevel?.includes(exp)
      ) {
        (childAny = childAny || []).push(exp);
      }
    }

    if (vNode.children && vNode.children.length) {
      stack.push(currentLevel);
      currentLevel = createLocalVariables(
        vNode.children,
        childAny,
        childOnly,
        vNode.shadowId,
        recycledLocalVariables.pop()
      );
    }
    // check for "return"
    while (
      currentLevel.vNodesIndex === currentLevel.vNodes.length &&
      stack.length
    ) {
      recycledLocalVariables.push(currentLevel);
      currentLevel = stack.pop();
    }
  }
  return result;
}

/**
 * querySelectorAllFilter implements querySelectorAll on the virtual DOM with
 * ability to filter the returned nodes using an optional supplied filter function
 *
 * @method querySelectorAllFilter
 * @memberof axe.utils
 * @param {NodeList} domTree flattened tree collection to search
 * @param {String} selector String containing one or more CSS selectors separated by commas
 * @param {Function} filter function (optional)
 * @return {Array} Elements matched by any of the selectors and filtered by the filter function
 */
function querySelectorAllFilter(domTree, selector, filter) {
  domTree = Array.isArray(domTree) ? domTree : [domTree];
  const expressions = convertSelector(selector);

  // see if the passed in node is the root node of the tree and can
  // find nodes using the cache rather than looping through the
  // the entire tree
  const nodes = getNodesMatchingExpression(domTree, expressions, filter);
  if (nodes) {
    return nodes;
  }

  // if the selector cache is not set up or if not passed the
  // top level node we default back to parsing the whole tree
  return matchExpressions(domTree, expressions, filter);
}

export default querySelectorAllFilter;
