import { matchesExpression, convertSelector } from './matches';
import { getNodeSelectorMap } from './selector-map';

function createLocalVariables(vNodes, anyLevel, thisLevel, parentShadowId) {
  let retVal = {
    vNodes: vNodes.slice(),
    anyLevel: anyLevel,
    thisLevel: thisLevel,
    parentShadowId: parentShadowId
  };
  retVal.vNodes.reverse();
  return retVal;
}

function matchExpressions(domTree, expressions, filter) {
  let stack = [];
  let vNodes = Array.isArray(domTree) ? domTree : [domTree];
  let currentLevel = createLocalVariables(
    vNodes,
    expressions,
    [],
    domTree[0].shadowId
  );
  let result = [];

  while (currentLevel.vNodes.length) {
    let vNode = currentLevel.vNodes.pop();
    let childOnly = []; // we will add hierarchical '>' selectors here
    let childAny = [];
    let combined = currentLevel.anyLevel.slice().concat(currentLevel.thisLevel);
    let added = false;
    // see if node matches
    for (let i = 0; i < combined.length; i++) {
      let exp = combined[i];
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
          let rest = exp.slice(1);
          if ([' ', '>'].includes(rest[0].combinator) === false) {
            throw new Error(
              'axe.utils.querySelectorAll does not support the combinator: ' +
                exp[1].combinator
            );
          }
          if (rest[0].combinator === '>') {
            // add the rest to the childOnly array
            childOnly.push(rest);
          } else {
            // add the rest to the childAny array
            childAny.push(rest);
          }
        }
      }
      if (
        (!exp[0].id || vNode.shadowId === currentLevel.parentShadowId) &&
        currentLevel.anyLevel.includes(exp)
      ) {
        childAny.push(exp);
      }
    }

    if (vNode.children && vNode.children.length) {
      stack.push(currentLevel);
      currentLevel = createLocalVariables(
        vNode.children,
        childAny,
        childOnly,
        vNode.shadowId
      );
    }
    // check for "return"
    while (!currentLevel.vNodes.length && stack.length) {
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
  const selectorMap = getNodeSelectorMap();
  const expressions = convertSelector(selector);

  // only use the selector map if passed the top-level dom node
  if (!selectorMap || (axe._tree && domTree[0] !== axe._tree[0])) {
    return matchExpressions(domTree, expressions, filter);
  }

  let matchedNodes = [];
  expressions.forEach(function(expression) {
    // use the last part of the expression to find nodes as it's more
    // specific. e.g. for `body *` use `*` and not `body`
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
      nodes = selectorMap['[id]'];
    } else if (exp.classes && selectorMap['[class]']) {
      nodes = selectorMap['[class]'];
    } else if (exp.attributes) {
      for (var i = 0; i < exp.attributes.length; i++) {
        var attrName = exp.attributes[i].key;
        if (selectorMap['['.concat(attrName, ']')]) {
          nodes = selectorMap['['.concat(attrName, ']')];
          break;
        }
      }
    }

    nodes.forEach(node => {
      if (matchesExpression(node, exp) && !matchedNodes.includes(node)) {
        matchedNodes.push(node);
      }
    });
  });

  if (filter) {
    matchedNodes = matchedNodes.filter(filter);
  }

  return matchedNodes.sort((a, b) => a._nodeIndex - b._nodeIndex);
}

export default querySelectorAllFilter;
