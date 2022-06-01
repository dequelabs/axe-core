import { matchesExpression } from './matches';
import tokenList from './token-list';

// since attribute names can't contain whitespace, this will be
// a reserved list for ids so we can perform virtual id lookups
const idsKey = ' [idsMap]';

/**
 * Get nodes from the selector cache that match the selector.
 * @param {VirtualTree[]} domTree flattened tree collection to search
 * @param {Object} expressions
 * @param {Function} filter function (optional)
 * @return {Mixed} Array of nodes that match the selector or undefined if the selector map is not setup
 */
export function getNodesMatchingExpression(domTree, expressions, filter) {
  // check to see if the domTree is the root and has the selector
  // map. if not we just return and let our QSA code do the finding
  const selectorMap = domTree[0]._selectorMap;
  if (!selectorMap) {
    return;
  }

  const shadowId = domTree[0].shadowId;

  // if the selector uses a global selector with a combinator
  // (e.g. A *, A > *) it's actually faster to use our QSA code than
  // getting all nodes and using matchesExpression
  for (let i = 0; i < expressions.length; i++) {
    if (
      expressions[i].length > 1 &&
      expressions[i].some(expression => isGlobalSelector(expression))
    ) {
      return;
    }
  }

  // it turned out to be more performant to use a Set to generate a
  // unique list of nodes rather than an array and array.includes
  // (~3 seconds total on a benchmark site)
  const nodeSet = new Set();

  expressions.forEach(expression => {
    const matchingNodes = findMatchingNodes(expression, selectorMap, shadowId);
    matchingNodes?.nodes?.forEach(node => {
      // for complex selectors we need to verify that the node
      // actually matches the entire selector since we only have
      // nodes that partially match the last part of the selector
      if (
        matchingNodes.isComplexSelector &&
        !matchesExpression(node, expression)
      ) {
        return;
      }

      nodeSet.add(node);
    });
  });

  // Sets in ie11 do not work with Array.from without a polyfill
  //(missing `.entries`), but do have forEach
  let matchedNodes = [];
  nodeSet.forEach(node => matchedNodes.push(node));

  if (filter) {
    matchedNodes = matchedNodes.filter(filter);
  }

  return matchedNodes.sort((a, b) => a.nodeIndex - b.nodeIndex);
}

/**
 * Add nodes to the passed in Set that match just a part of the selector in order to speed up traversing the entire tree.
 * @param {Object} expression Selector Expression
 * @param {Object} selectorMap Selector map cache
 * @param {String} shadowId ShadowID of the root node
 */
function findMatchingNodes(expression, selectorMap, shadowId) {
  // use the last part of the expression to find nodes as it's more
  // specific. e.g. for `body h1` use `h1` and not `body`
  const exp = expression[expression.length - 1];
  let nodes = null;

  // a complex selector is one that will require using
  // matchesExpression to determine if it matches. these include
  // pseudo selectors (:not), combinators (A > B), and any
  // attribute value ([class=foo]).
  let isComplexSelector =
    expression.length > 1 || !!exp.pseudos || !!exp.classes;

  if (isGlobalSelector(exp)) {
    nodes = selectorMap['*'];
  } else {
    if (exp.id) {
      // a selector must match all parts, otherwise we can just exit
      // early
      if (!selectorMap[idsKey] || !selectorMap[idsKey][exp.id]?.length) {
        return;
      }

      // when using id selector (#one) we only find nodes that
      // match the shadowId of the root
      nodes = selectorMap[idsKey][exp.id].filter(
        node => node.shadowId === shadowId
      );
    }

    if (exp.tag && exp.tag !== '*') {
      if (!selectorMap[exp.tag]?.length) {
        return;
      }

      const cachedNodes = selectorMap[exp.tag];
      nodes = nodes ? getSharedValues(cachedNodes, nodes) : cachedNodes;
    }

    if (exp.classes) {
      if (!selectorMap['[class]']?.length) {
        return;
      }

      const cachedNodes = selectorMap['[class]'];
      nodes = nodes ? getSharedValues(cachedNodes, nodes) : cachedNodes;
    }

    if (exp.attributes) {
      for (let i = 0; i < exp.attributes.length; i++) {
        const attr = exp.attributes[i];

        // an attribute selector that looks for a specific value is
        // a complex selector
        if (attr.type === 'attrValue') {
          isComplexSelector = true;
        }

        if (!selectorMap[`[${attr.key}]`]?.length) {
          return;
        }

        const cachedNodes = selectorMap[`[${attr.key}]`];
        nodes = nodes ? getSharedValues(cachedNodes, nodes) : cachedNodes;
      }
    }
  }

  return { nodes, isComplexSelector };
}

/**
 * Non-tag selectors use `*` for the tag name so a global selector won't have any other properties of the expression. Pseudo selectors that use `*` (e.g. `*:not([class])`) will still be considered a global selector since we don't cache anything for pseudo selectors and will rely on filtering with matchesExpression.
 * @param {Object} expression Selector Expression
 * @returns {Boolean}
 */
function isGlobalSelector(expression) {
  return (
    expression.tag === '*' &&
    !expression.attributes &&
    !expression.id &&
    !expression.classes
  );
}

/**
 * Find all nodes in A that are also in B.
 * @param {Mixed[]} a
 * @param {Mixed[]} b
 * @returns {Mixed[]}
 */
function getSharedValues(a, b) {
  return a.filter(node => b.includes(node));
}

/**
 * Save a selector and vNode to the selectorMap.
 * @param {String} key
 * @param {VirtualNode} vNode
 * @param {Object} map
 */
function cacheSelector(key, vNode, map) {
  map[key] = map[key] || [];
  map[key].push(vNode);
}

/**
 * Cache selector information about a VirtalNode.
 * @param {VirtualNode} vNode
 */
export function cacheNodeSelectors(vNode, selectorMap) {
  if (vNode.props.nodeType !== 1) {
    return;
  }

  cacheSelector(vNode.props.nodeName, vNode, selectorMap);
  cacheSelector('*', vNode, selectorMap);

  vNode.attrNames.forEach(attrName => {
    // element ids are the only values we'll match
    if (attrName === 'id') {
      selectorMap[idsKey] = selectorMap[idsKey] || {};
      tokenList(vNode.attr(attrName)).forEach(value => {
        cacheSelector(value, vNode, selectorMap[idsKey]);
      });
    }

    cacheSelector(`[${attrName}]`, vNode, selectorMap);
  });
}
