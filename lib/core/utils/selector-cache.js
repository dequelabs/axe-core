import { convertSelector, matchesExpression } from './matches';

let selectorMap = {};

function cacheSelector(key, vNode) {
  selectorMap[key] = selectorMap[key] || [];
  selectorMap[key].push(vNode);
}

/**
 * Cache selector information about a VirtalNode
 * @param {VirtualNode} vNode
 */
export function cacheNodeSelectors(vNode, nodeIndex = 0) {
  if (vNode.props.nodeType !== 1) {
    return;
  }

  // node index is used for sorting nodes by their DOM order in
  // `axe.utils.querySelectorAllFtiler` since multiple expressions
  // will need to sort the nodes by DOM order
  vNode._nodeIndex = nodeIndex;

  // cache the selector map to the root node of the tree
  if (nodeIndex === 0) {
    selectorMap = {};
    vNode._selectorMap = selectorMap;
  }

  cacheSelector(vNode.props.nodeName, vNode);
  cacheSelector('*', vNode);

  vNode.attrNames.forEach(attrName => {
    cacheSelector(`[${attrName}]`, vNode);
  });
}

/**
 * Get nodes from the selector cache that match the selector
 * @param {VirtualTree[]} domTree flattened tree collection to search
 * @param {String} selector
 * @param {Function} filter function (optional)
 * @return {Mixed} Array of nodes that match the selector or undefined if the selector map is not setup
 */
export function getNodesMatchingSelector(domTree, selector, filter) {
  // check to see if the domTree is the root and has the selector
  // map. if not we just return and let our QSA code do the finding
  const selectorMap = domTree[0]._selectorMap;
  if (!selectorMap) {
    return;
  }

  const shadowId = domTree[0].shadowId;
  const expressions = convertSelector(selector);
  let matchedNodes = [];

  // find nodes that match just a part of the selector in order
  // to speed up traversing the entire tree
  expressions.forEach(expression => {
    // use the last part of the expression to find nodes as it's more
    // specific. e.g. for `body h1` use `h1` and not `body`
    const exp = expression[expression.length - 1];

    // the expression `[id]` will use `*` as the tag name
    const isGlobalSelector =
      exp.tag === '*' && !exp.attributes && !exp.id && !exp.classes;
    let nodes = [];

    if (isGlobalSelector && selectorMap['*']) {
      nodes = selectorMap['*'];
    }
    // for `h1[role]` we want to use the tag name as it is more
    // specific than using all nodes with the role attribute
    else if (exp.tag && exp.tag !== '*' && selectorMap[exp.tag]) {
      nodes = selectorMap[exp.tag];
    } else if (exp.id && selectorMap['[id]']) {
      // when using id selector (#one) we should only select nodes
      // that match the shadowId of the root
      nodes = selectorMap['[id]'].filter(node => node.shadowId === shadowId);
    } else if (exp.classes && selectorMap['[class]']) {
      nodes = selectorMap['[class]'];
    } else if (exp.attributes) {
      // break once we find nodes that match any of the attributes
      for (let i = 0; i < exp.attributes.length; i++) {
        const attrName = exp.attributes[i].key;
        if (selectorMap['['.concat(attrName, ']')]) {
          nodes = selectorMap['['.concat(attrName, ']')];
          break;
        }
      }
    }

    // now that we have a list of all nodes that match a part of
    // the expression we need to check if the node actually matches
    // the entire expression
    nodes.forEach(node => {
      if (matchesExpression(node, expression) && !matchedNodes.includes(node)) {
        matchedNodes.push(node);
      }
    });
  });

  if (filter) {
    matchedNodes = matchedNodes.filter(filter);
  }

  return matchedNodes.sort((a, b) => a._nodeIndex - b._nodeIndex);
}
