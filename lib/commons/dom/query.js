import { matchesExpression, convertSelector } from '../../core/utils/matches';
import { getNodesMatchingExpression } from '../../core/utils/selector-cache';

/**
 * query implements querySelectorAll on the virtual DOM with
 * ability to filter the returned nodes using an optional supplied filter function
 *
 * @method query
 * @memberof axe.commons.dom
 * @param {NodeList} domTree flattened tree collection to search
 * @param {String} selector String containing one or more CSS selectors separated by commas
 * @param {Function} filter function (optional)
 * @return {Array} Elements matched by any of the selectors and filtered by the filter function
 */
export default function query(domTree, selector, filter) {
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

/**
 * Return a list of vNodes that matches the expression, starting at the passed in vNode and recursing all children.
 * @param {vNodes} vNodes vNodes to match
 * @param {Object|Object[]} expressions CSS selector expression or array of expressions
 * @param {String} [rootShadowId] Shadow ID of the root nodes for id matches
 */
function matchExpressions(vNodes, expressions, filter, rootShadowId, recursed) {
  const matchedNodes = [];

  for (const vNode of vNodes) {
    const shadowId = recursed ? rootShadowId : vNode.shadowId;

    for (const expression of expressions) {
      if (
        matchesExpression(vNode, expression) &&
        (!expression[0].id || vNode.shadowId === shadowId) &&
        (!filter || filter(vNode))
      ) {
        matchedNodes.push(vNode);
        // once added we don't need to match the node anymore
        break;
      }
    }

    if (vNode.children) {
      matchedNodes.push(
        ...matchExpressions(vNode.children, expressions, filter, shadowId, true)
      );
    }
  }

  return matchedNodes;
}
