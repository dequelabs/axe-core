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

function matchExpression(vNode, expression) {
  return (
    matchesTag(vNode, expression) &&
    matchesClasses(vNode, expression) &&
    matchesAttributes(vNode, expression) &&
    matchesId(vNode, expression) &&
    matchesPseudos(vNode, expression)
  );
}

const escapeRegExp = (() => {
  /*! Credit: XRegExp 0.6.1 (c) 2007-2008 Steven Levithan <http://stevenlevithan.com/regex/xregexp/> MIT License */
  const from = /(?=[\-\[\]{}()*+?.\\\^$|,#\s])/g;
  const to = '\\';
  return string => {
    return string.replace(from, to);
  };
})();

/**
 * Compare two strings for equality using ASCII case-insensitive comparison,
 * as used by the `[attr="value" i]` selector modifier.
 * @private
 * @param {String} a
 * @param {String} b
 * @returns {Boolean}
 */
function equalsIgnoreAsciiCase(a, b) {
  if (a === b) {
    return true;
  }
  if (a.length !== b.length) {
    return false;
  }
  for (let i = 0; i < a.length; i++) {
    let aChar = a.charCodeAt(i);
    let bChar = b.charCodeAt(i);
    // fold ASCII uppercase A-Z onto lowercase a-z
    if (aChar >= 65 && aChar <= 90) {
      aChar += 32;
    }
    if (bChar >= 65 && bChar <= 90) {
      bChar += 32;
    }
    if (aChar !== bChar) {
      return false;
    }
  }
  return true;
}

/**
 * Build a RegExp source that matches `value` using ASCII case-insensitive
 * comparison (CSS Selectors 4 `[attr=value i]`). Compiled at convert time so
 * matching does not allocate or rely on the JS `i` flag, which also folds
 * non-ASCII letters.
 * @private
 * @param {String} value
 * @returns {String}
 */
function asciiCaseInsensitiveSource(value) {
  let source = '';
  for (const ch of value) {
    const code = ch.charCodeAt(0);
    if (ch.length === 1 && code >= 65 && code <= 90) {
      source += '[' + ch + String.fromCharCode(code + 32) + ']';
    } else if (ch.length === 1 && code >= 97 && code <= 122) {
      source += '[' + String.fromCharCode(code - 32) + ch + ']';
    } else {
      source += escapeRegExp(ch);
    }
  }
  return source;
}

function convertAttributes(atts) {
  /*! Credit Mootools Copyright Mootools, MIT License */
  if (!atts) {
    return;
  }
  return atts.map(att => {
    const attributeKey = att.name;
    const attributeValue = att.value ? att.value.value : '';
    // `[attr="value" i]` (or `I`) matches case-insensitively; `s` is explicit
    // case-sensitive and so behaves the same as no modifier
    const caseInsensitive = att.caseSensitivityModifier?.toLowerCase() === 'i';
    const pattern = caseInsensitive
      ? asciiCaseInsensitiveSource(attributeValue)
      : escapeRegExp(attributeValue);
    let test, regexp;

    switch (att.operator) {
      case '^=':
        regexp = new RegExp('^' + pattern);
        break;
      case '$=':
        regexp = new RegExp(pattern + '$');
        break;
      case '~=':
        regexp = new RegExp('(^|\\s)' + pattern + '(\\s|$)');
        break;
      case '|=':
        regexp = new RegExp('^' + pattern + '(-|$)');
        break;
      case '=':
        test = caseInsensitive
          ? value => {
              return equalsIgnoreAsciiCase(attributeValue, value);
            }
          : value => {
              return attributeValue === value;
            };
        break;
      case '*=':
        if (caseInsensitive) {
          regexp = new RegExp(pattern);
        } else {
          test = value => {
            return value && value.includes(attributeValue);
          };
        }
        break;
      case '!=':
        test = caseInsensitive
          ? value => {
              return !equalsIgnoreAsciiCase(attributeValue, value);
            }
          : value => {
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
      expressions = convertExpressions(p.argument.rules);
    }
    return {
      name: p.name,
      expressions: expressions,
      value: p.argument
    };
  });
}

/**
 * convert a css-selector-parser v3 Rule into the Slick format
 * @private
 * @param {Object} rule AstRule
 * @return {Object}
 */
function convertRule(rule) {
  const expression = {
    tag: '*',
    combinator: rule.combinator || ' ',
    id: undefined
  };
  let atts, classNames, pseudos;

  for (const item of rule.items) {
    switch (item.type) {
      case 'TagName':
        expression.tag = item.name.toLowerCase();
        break;
      case 'WildcardTag':
        break;
      case 'Id':
        expression.id = item.name;
        break;
      case 'Attribute':
        (atts = atts || []).push(item);
        break;
      case 'ClassName':
        (classNames = classNames || []).push(item.name);
        break;
      case 'PseudoClass':
      case 'PseudoElement':
        (pseudos = pseudos || []).push(item);
        break;
    }
  }

  expression.attributes = convertAttributes(atts);
  expression.classes = convertClasses(classNames);
  expression.pseudos = convertPseudos(pseudos);
  return expression;
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
    let rule = exp;
    while (rule) {
      newExp.push(convertRule(rule));
      rule = rule.nestedRule;
    }
    return newExp;
  });
}

/**
 * Convert a CSS selector to the Slick format expression
 *
 * @private
 * @param {String} selector CSS selector to convert
 * @returns {Object[]} Array of Slick format expressions
 */
export function convertSelector(selector) {
  const expressions = cssParser.parse(selector);
  return convertExpressions(expressions.rules);
}

/**
 * Determine if a virtual node matches a Slick format CSS expression.
 *
 * Note: this function is in the hot path, avoid memory allocation.
 *
 * @private
 * @method optimizedMatchesExpression
 * @memberof axe.utils
 * @param {VirtualNode} vNode VirtualNode to match
 * @param {Object|Object[]} expressions CSS selector expression or array of expressions
 * @param {Number|NaN} index index of expression to match on if expressions is array
 * @returns {Boolean}
 */
function optimizedMatchesExpression(vNode, expressions, index, matchAnyParent) {
  if (!vNode) {
    return false;
  }

  const isArray = Array.isArray(expressions);
  const expression = isArray ? expressions[index] : expressions;
  let machedExpression = matchExpression(vNode, expression);

  while (!machedExpression && matchAnyParent && vNode.parent) {
    vNode = vNode.parent;
    machedExpression = matchExpression(vNode, expression);
  }

  if (index > 0) {
    if ([' ', '>'].includes(expression.combinator) === false) {
      throw new Error(
        'axe.utils.matchesExpression does not support the combinator: ' +
          expression.combinator
      );
    }

    machedExpression =
      machedExpression &&
      optimizedMatchesExpression(
        vNode.parent,
        expressions,
        index - 1,
        expression.combinator === ' '
      );
  }

  return machedExpression;
}

/**
 * Determine if a virtual node matches a Slick format CSS expression
 *
 * @private
 * @method matchesExpression
 * @memberof axe.utils
 * @param {VirtualNode} vNode VirtualNode to match
 * @param {Object|Object[]} expressions CSS selector expression or array of expressions
 * @returns {Boolean}
 */
export function matchesExpression(vNode, expressions, matchAnyParent) {
  return optimizedMatchesExpression(
    vNode,
    expressions,
    expressions.length - 1,
    matchAnyParent
  );
}
