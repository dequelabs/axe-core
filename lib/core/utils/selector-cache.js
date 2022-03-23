import { convertSelector, matchesExpression } from './matches';
import tokenList from './token-list';

// since attribute names can't contain whitespace, this will be
// a reserved list for ids
const idsKey = ' [idsMap]';
let selectorMap = {};

function isGlobalSelector(exp) {
  return exp.tag === '*' && !exp.attributes && !exp.id && !exp.classes;
}

function cacheSelector(key, vNode, map = selectorMap) {
  map[key] = map[key] || [];
  map[key].push(vNode);
}

/**
 * Inner join two arrays.
 */
function innerJoin(a, b) {
  if (!b.length) {
    return a;
  }

  return a.filter(node => b.includes(node));
}

/**
 * Cache selector information about a VirtalNode
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

  // if the selector uses a global selector with a combinator
  // (A *, A > *) it's actually faster to use our QSA code than
  // getting all nodes and using matchesExpression
  for (let i = 0; i < expressions.length; i++) {
    if (
      expressions[i].length > 1 &&
      expressions[i].some(expression => isGlobalSelector(expression))
    ) {
      return;
    }
  }

  let matchedNodes = [];

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
    // attribute value ([class=.foo]).
    let isComplexSelector = expression.length > 1 || exp.pseudos || exp.classes;

    if (isGlobalSelector(exp) && selectorMap['*']) {
      nodes = selectorMap['*'];
    } else {
      // a selector must match all parts, otherwise we can just exit
      // early
      if (exp.id) {
        if (!selectorMap[idsKey] || !selectorMap[idsKey][exp.id]?.length) {
          return;
        }

        // when using id selector (#one) we should only select nodes
        // that match the shadowId of the root
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

        nodes = innerJoin(selectorMap[exp.classes], nodes);
      }

      if (exp.attributes) {
        for (let i = 0; i < exp.attributes.length; i++) {
          const attr = exp.attributes[i];

          // to test if the attribute is looking for existence of
          // the attribute or a specific value, we need to use
          // the "test" function (since the expression doesn't
          // differentiate between [href] and [href=""]).
          // since specific values use string matching, passing
          // the boolean true will only return true for existence
          // tests.
          // a specific value check is a complex selector
          if (!attr.test(true)) {
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
      if (isComplexSelector && !matchesExpression(node, expression)) {
        return;
      }

      if (!matchedNodes.includes(node)) {
        matchedNodes.push(node);
      }
    });

    // // use the last part of the expression to find nodes as it's more
    // // specific. e.g. for `body h1` use `h1` and not `body`
    // const exp = expression[expression.length - 1];

    // // the expression `[id]` will use `*` as the tag name
    // const isGlobalSelector =
    //   exp.tag === '*' && !exp.attributes && !exp.id && !exp.classes;
    // let nodes = [];

    // if (isGlobalSelector && selectorMap['*']) {
    //   nodes = selectorMap['*'];
    // }
    // // for `h1[role]` we want to use the tag name as it is more
    // // specific than using all nodes with the role attribute
    // else if (exp.tag && exp.tag !== '*' && selectorMap[exp.tag]) {
    //   nodes = selectorMap[exp.tag];
    // } else if (exp.id && selectorMap['[id]']) {
    //   // when using id selector (#one) we should only select nodes
    //   // that match the shadowId of the root
    //   nodes = selectorMap['[id]'].filter(node => node.shadowId === shadowId);
    // } else if (exp.classes && selectorMap['[class]']) {
    //   nodes = selectorMap['[class]'];
    // } else if (exp.attributes) {
    //   // break once we find nodes that match any of the attributes
    //   for (let i = 0; i < exp.attributes.length; i++) {
    //     const attrName = exp.attributes[i].key;
    //     if (selectorMap['['.concat(attrName, ']')]) {
    //       nodes = selectorMap['['.concat(attrName, ']')];
    //       break;
    //     }
    //   }
    // }

    // // now that we have a list of all nodes that match a part of
    // // the expression we need to check if the node actually matches
    // // the entire expression
    // nodes.forEach(node => {
    //   if (matchesExpression(node, expression) && !matchedNodes.includes(node)) {
    //     matchedNodes.push(node);
    //   }
    // });
  });

  if (filter) {
    matchedNodes = matchedNodes.filter(filter);
  }

  return matchedNodes.sort((a, b) => a.nodeIndex - b.nodeIndex);
}
