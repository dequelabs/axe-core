import { matchesExpression } from './matches';
import tokenList from './token-list';

// since attribute names can't contain whitespace, this will be
// a reserved list for ids so we can perform virtual id lookups
const idsKey = ' [idsMap]';
let selectorMap = {};

/**
 * Non-tag selectors use `*` for the tag name so a global selector won't have any other properties of the expression.
 * @param {Object} exp Selector Expression
 * @returns {Boolean}
 */
function isGlobalSelector(exp) {
  return exp.tag === '*' && !exp.attributes && !exp.id && !exp.classes;
}

/**
 * Save a selector and vNode to the selectorMap
 * @param {String} key
 * @param {VirtualNode} vNode
 * @param {Object} map
 */
function cacheSelector(key, vNode, map = selectorMap) {
  map[key] = map[key] || [];
  map[key].push(vNode);
}

/**
 * Inner join two arrays (find all nodes in a that are also in b).
 * @param {*[]} a
 * @param {*[]} b
 * @returns {*[]}
 */
function innerJoin(a, b) {
  if (!b.length) {
    return a;
  }

  return a.filter(node => b.includes(node));
}

/**
 * Cache selector information about a VirtalNode.
 * @param {VirtualNode} vNode
 */
export function cacheNodeSelectors(vNode) {
  if (vNode.props.nodeType !== 1) {
    return;
  }

  // cache the selector map to the root node of the tree
  if (vNode.nodeIndex === 0) {
    selectorMap = {};
    vNode._selectorMap = selectorMap;
  }

  cacheSelector(vNode.props.nodeName, vNode);
  cacheSelector('*', vNode);

  vNode.attrNames.forEach(attrName => {
    // element ids are the only values we'll match
    if (attrName === 'id') {
      selectorMap[idsKey] = selectorMap[idsKey] || {};
      tokenList(vNode.attr(attrName)).forEach(value => {
        cacheSelector(value, vNode, selectorMap[idsKey]);
      });
    }

    cacheSelector(`[${attrName}]`, vNode);
  });
}

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

  let matchedNodes = new Set();

  // find nodes that match just a part of the selector in order
  // to speed up traversing the entire tree
  expressions.forEach(expression => {
    // use the last part of the expression to find nodes as it's more
    // specific. e.g. for `body h1` use `h1` and not `body`
    const exp = expression[expression.length - 1];
    let nodes = [];

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

        nodes = innerJoin(selectorMap[exp.tag], nodes);
      }

      if (exp.classes) {
        if (!selectorMap['[class]']?.length) {
          return;
        }

        nodes = innerJoin(selectorMap['[class]'], nodes);
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

          nodes = innerJoin(selectorMap[`[${attr.key}]`], nodes);
        }
      }
    }

    nodes.forEach(node => {
      // for complex selectors we need to verify that the node
      // actually matches the entire selector since we only have
      // nodes that partially match the last part of the selector
      if (isComplexSelector && !matchesExpression(node, expression)) {
        return;
      }

      matchedNodes.add(node);
    });
  });

  matchedNodes = Array.from(matchedNodes);

  if (filter) {
    matchedNodes = matchedNodes.filter(filter);
  }

  return matchedNodes.sort((a, b) => a.nodeIndex - b.nodeIndex);
}
