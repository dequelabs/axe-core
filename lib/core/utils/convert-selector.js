var escapeRegExp = (function() {
	/*! Credit: XRegExp 0.6.1 (c) 2007-2008 Steven Levithan <http://stevenlevithan.com/regex/xregexp/> MIT License */
	var from = /(?=[\-\[\]{}()*+?.\\\^$|,#\s])/g;
	var to = '\\';
	return function(string) {
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
function convertExpressions(expressions) {
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
}

/**
 * Convert a CSS selector to the Slick format expression
 *
 * @param {String} selector CSS selector to convert
 * @returns {Object[]} Array of Slick format expressions
 */
axe.utils.convertSelector = function convertSelector(selector) {
	var expressions = axe.utils.cssParser.parse(selector);
	expressions = expressions.selectors ? expressions.selectors : [expressions];
	return convertExpressions(expressions);
};
