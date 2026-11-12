import cssParser from './css-parser';

/**
 * matches implementation that operates on a VirtualNode
 *
 * @method matches
 * @memberof axe.utils
 * @param {VirtualNode} vNode VirtualNode to match
 * @param {String} selector CSS selector string
 * @return {Boolean}
 */
export default function matches(vNode, selector) {
  const expressions = convertSelector(selector);
  return expressions.some(expression => matchesExpression(vNode, expression));
}

/**
 * Convert a CSS selector to the Slick format expression
 *
 * @private
 * @param {String} selector CSS selector to convert
 * @returns {Object[]} Array of Slick format expressions
 */
export function convertSelector(selector) {
  let expressions = cssParser.parse(selector);
  expressions = expressions.selectors ? expressions.selectors : [expressions];
  return convertExpressions(expressions);
}

/**
 * Determine if a virtual node matches a Slick format CSS expression
 *
 * Note: this function is in the hot path, avoid memory allocation.
 *
 * @private
 * @method matchesExpression
 * @memberof axe.utils
 * @param {VirtualNode} vNode VirtualNode to match
 * @param {Object|Object[]} expressions CSS selector expression or array of expressions
 * @returns {Boolean}
 */
export function matchesExpression(vNode, expressions) {
  expressions = Array.isArray(expressions) ? expressions : [expressions];

  // exit early if the key selector (right-most part) doesn't match
  let index = expressions.length - 1;
  if (!matchExpression(vNode, expressions[index])) {
    return false;
  }

  // when trying to match a combination of descendant selector (' ') and direct
  // descendant selector ('>') and the direct descendant selector fails we need
  // to know the state of the last descendant selector that matched so we can start
  // from there to continue finding matches. we don't recreate this object as to
  // only allocate it once
  const lastDescendantMatch = { index, vNode };
  let shadowIdOfIdExp = expressions[index].id ? vNode.shadowId : null;
  index--;
  vNode = vNode.parent;

  while (index >= 0 && index < expressions.length - 1 && vNode) {
    const expression = expressions[index];

    // css-parser attaches the combinator to next expression in left-to-right order
    // (e.g. 'main > div' the `>` combinator is attached to the `div` and not `main`)
    // but since we're traversing in right-to-left we need the combinator from the
    // next expression to know how the current expression relates to it
    const combinator = expressions[index + 1].combinator;
    const matched = matchExpression(vNode, expression);

    // do not cross shadow DOM boundaries whenever an id selector is used
    const crossesShadowDom =
      shadowIdOfIdExp && vNode.shadowId !== shadowIdOfIdExp;

    if (matched && !crossesShadowDom) {
      if (combinator === ' ') {
        lastDescendantMatch.index = index;
        lastDescendantMatch.vNode = vNode;
      }
      if (expression.id) {
        shadowIdOfIdExp = vNode.shadowId;
      }

      index--;
      vNode = vNode.parent;
      continue;
    }

    if ([' ', '>'].includes(combinator) === false) {
      throw new Error(
        'axe.commons.dom.query does not support the combinator: ' + combinator
      );
    }

    if (combinator === ' ') {
      vNode = vNode.parent;
    } else {
      index = lastDescendantMatch.index;
      vNode = lastDescendantMatch.vNode.parent;
    }
  }

  // got to the end of the expressions so the node matches all parts
  return index < 0;
}

function matchExpression(vNode, expression) {
  return (
    matchesTag(vNode, expression) &&
    matchesClasses(vNode, expression) &&
    matchesAttributes(vNode, expression) &&
    matchesId(vNode, expression) &&
    matchesPseudos(vNode, expression)
  );
}

function matchesTag(vNode, exp) {
  return (
    vNode.props.nodeType === 1 &&
    (exp.tag === '*' || vNode.props.nodeName === exp.tag)
  );
}

function matchesClasses(vNode, exp) {
  return !exp.classes || exp.classes.every(cl => vNode.hasClass(cl.value));
}

function matchesAttributes(vNode, exp) {
  return (
    !exp.attributes ||
    exp.attributes.every(att => {
      const nodeAtt = vNode.attr(att.key);
      return nodeAtt !== null && att.test(nodeAtt);
    })
  );
}

function matchesId(vNode, exp) {
  return !exp.id || vNode.props.id === exp.id;
}

function matchesPseudos(target, exp) {
  if (
    !exp.pseudos ||
    exp.pseudos.every(pseudo => {
      if (pseudo.name === 'not') {
        return !pseudo.expressions.some(expression => {
          return matchesExpression(target, expression);
        });
      } else if (pseudo.name === 'is') {
        return pseudo.expressions.some(expression => {
          return matchesExpression(target, expression);
        });
      }
      throw new Error(
        'the pseudo selector ' + pseudo.name + ' has not yet been implemented'
      );
    })
  ) {
    return true;
  }
  return false;
}

const escapeRegExp = (() => {
  /*! Credit: XRegExp 0.6.1 (c) 2007-2008 Steven Levithan <http://stevenlevithan.com/regex/xregexp/> MIT License */
  const from = /(?=[\-\[\]{}()*+?.\\\^$|,#\s])/g;
  const to = '\\';
  return string => {
    return string.replace(from, to);
  };
})();

const reUnescape = /\\/g;
function convertAttributes(atts) {
  /*! Credit Mootools Copyright Mootools, MIT License */
  if (!atts) {
    return;
  }
  return atts.map(att => {
    const attributeKey = att.name.replace(reUnescape, '');
    const attributeValue = (att.value || '').replace(reUnescape, '');
    let test, regexp;

    switch (att.operator) {
      case '^=':
        regexp = new RegExp('^' + escapeRegExp(attributeValue));
        break;
      case '$=':
        regexp = new RegExp(escapeRegExp(attributeValue) + '$');
        break;
      case '~=':
        regexp = new RegExp(
          '(^|\\s)' + escapeRegExp(attributeValue) + '(\\s|$)'
        );
        break;
      case '|=':
        regexp = new RegExp('^' + escapeRegExp(attributeValue) + '(-|$)');
        break;
      case '=':
        test = value => {
          return attributeValue === value;
        };
        break;
      case '*=':
        test = value => {
          return value && value.includes(attributeValue);
        };
        break;
      case '!=':
        test = value => {
          return attributeValue !== value;
        };
        break;
      // attribute existence
      default:
        test = value => {
          return value !== null;
        };
    }

    if (attributeValue === '' && /^[*$^]=$/.test(att.operator)) {
      test = () => {
        return false;
      };
    }

    if (!test) {
      test = value => {
        return value && regexp.test(value);
      };
    }
    return {
      key: attributeKey,
      value: attributeValue,
      type: typeof att.value === 'undefined' ? 'attrExist' : 'attrValue',
      test: test
    };
  });
}

function convertClasses(classes) {
  if (!classes) {
    return;
  }
  return classes.map(className => {
    className = className.replace(reUnescape, '');

    return {
      value: className,
      regexp: new RegExp('(^|\\s)' + escapeRegExp(className) + '(\\s|$)')
    };
  });
}

function convertPseudos(pseudos) {
  if (!pseudos) {
    return;
  }
  return pseudos.map(p => {
    let expressions;

    if (['is', 'not'].includes(p.name)) {
      expressions = p.value;
      expressions = expressions.selectors
        ? expressions.selectors
        : [expressions];
      expressions = convertExpressions(expressions);
    }
    return {
      name: p.name,
      expressions: expressions,
      value: p.value
    };
  });
}

/**
 * convert the css-selector-parser format into the Slick format
 * @private
 * @param Array {Object} expressions
 * @return Array {Object}
 *
 */
function convertExpressions(expressions) {
  return expressions.map(exp => {
    const newExp = [];
    let rule = exp.rule;
    while (rule) {
      /* eslint no-restricted-syntax: 0 */
      // `.tagName` is a property coming from the `CSSSelectorParser` library
      newExp.push({
        tag: rule.tagName ? rule.tagName.toLowerCase() : '*',
        combinator: rule.nestingOperator ? rule.nestingOperator : ' ',
        id: rule.id,
        attributes: convertAttributes(rule.attrs),
        classes: convertClasses(rule.classNames),
        pseudos: convertPseudos(rule.pseudos)
      });
      rule = rule.rule;
    }
    return newExp;
  });
}
