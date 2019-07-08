// The lines below is because the latedef option does not work
var convertExpressions = function() {};
var matchExpressions = function() {};

// todo: implement an option to follow aria-owns

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
		exp.attributes.reduce((result, att) => {
			var nodeAtt = vNode.attr(att.key);
			return result && nodeAtt !== null && (!att.value || att.test(nodeAtt));
		}, true)
	);
}

function matchesId(vNode, exp) {
	return !exp.id || vNode.props.id === exp.id;
}

function matchesPseudos(target, exp) {
	if (
		!exp.pseudos ||
		exp.pseudos.reduce((result, pseudo) => {
			if (pseudo.name === 'not') {
				return (
					result &&
					!matchExpressions([target], pseudo.expressions, false).length
				);
			}
			throw new Error(
				'the pseudo selector ' + pseudo.name + ' has not yet been implemented'
			);
		}, true)
	) {
		return true;
	}
	return false;
}

var escapeRegExp = (function() {
	/*! Credit: XRegExp 0.6.1 (c) 2007-2008 Steven Levithan <http://stevenlevithan.com/regex/xregexp/> MIT License */
	var from = /(?=[\-\[\]{}()*+?.\\\^$|,#\s])/g;
	var to = '\\';
	return function(string) {
		return string.replace(from, to);
	};
})();

var reUnescape = /\\/g;

function convertAttributes(atts) {
	/*! Credit Mootools Copyright Mootools, MIT License */
	if (!atts) {
		return;
	}
	return atts.map(att => {
		var attributeKey = att.name.replace(reUnescape, '');
		var attributeValue = (att.value || '').replace(reUnescape, '');
		var test, regexp;

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
				test = function(value) {
					return attributeValue === value;
				};
				break;
			case '*=':
				test = function(value) {
					return value && value.includes(attributeValue);
				};
				break;
			case '!=':
				test = function(value) {
					return attributeValue !== value;
				};
				break;
			default:
				test = function(value) {
					return !!value;
				};
		}

		if (attributeValue === '' && /^[*$^]=$/.test(att.operator)) {
			test = function() {
				return false;
			};
		}

		if (!test) {
			test = function(value) {
				return value && regexp.test(value);
			};
		}
		return {
			key: attributeKey,
			value: attributeValue,
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
		var expressions;

		if (p.name === 'not') {
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
convertExpressions = function(expressions) {
	return expressions.map(exp => {
		var newExp = [];
		var rule = exp.rule;
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
};

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

function matchesSelector(vNode, exp) {
	return (
		matchesTag(vNode, exp[0]) &&
		matchesClasses(vNode, exp[0]) &&
		matchesAttributes(vNode, exp[0]) &&
		matchesId(vNode, exp[0]) &&
		matchesPseudos(vNode, exp[0])
	);
}

matchExpressions = function(domTree, expressions, recurse, filter) {
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
				matchesSelector(vNode, exp) &&
				(!exp[0].id || vNode.shadowId === currentLevel.parentShadowId)
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
				currentLevel.anyLevel.includes(exp) &&
				(!exp[0].id || vNode.shadowId === currentLevel.parentShadowId)
			) {
				childAny.push(exp);
			}
		}
		// "recurse"
		if (vNode.children && vNode.children.length && recurse) {
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
};

/**
 * querySelectorAll implementation that operates on the flattened tree (supports shadow DOM)
 * @method querySelectorAll
 * @memberof axe.utils
 * @param	{NodeList} domTree flattened tree collection to search
 * @param	{String} selector String containing one or more CSS selectors separated by commas
 * @return {NodeList} Elements matched by any of the selectors
 */
axe.utils.querySelectorAll = function(domTree, selector) {
	return axe.utils.querySelectorAllFilter(domTree, selector);
};

/**
 * querySelectorAllFilter implements querySelectorAll on the virtual DOM with
 * ability to filter the returned nodes using an optional supplied filter function
 *
 * @method querySelectorAllFilter
 * @memberof axe.utils
 * @param	{NodeList} domTree flattened tree collection to search
 * @param	{String} selector String containing one or more CSS selectors separated by commas
 * @param	{Function} filter function (optional)
 * @return {Array} Elements matched by any of the selectors and filtered by the filter function
 */

axe.utils.querySelectorAllFilter = function(domTree, selector, filter) {
	domTree = Array.isArray(domTree) ? domTree : [domTree];
	var expressions = axe.utils.cssParser.parse(selector);
	expressions = expressions.selectors ? expressions.selectors : [expressions];
	expressions = convertExpressions(expressions);
	return matchExpressions(domTree, expressions, true, filter);
};
