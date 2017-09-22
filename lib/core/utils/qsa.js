// The lines below is because the latedef option does not work
var convertExpressions = function () {};
var matchExpressions = function () {};

// todo: implement an option to follow aria-owns

function matchesTag (node, exp) {
	return node.nodeType === 1 && (exp.tag === '*' || node.nodeName.toLowerCase() === exp.tag);
}

function matchesClasses (node, exp) {
	return !exp.classes || exp.classes.reduce((result, cl) => {
		return result && (node.className && node.className.match(cl.regexp));
	}, true);
}

function matchesAttributes (node, exp) {
	return !exp.attributes || exp.attributes.reduce((result, att) => {
		var nodeAtt = node.getAttribute(att.key);
		return result && nodeAtt !== null && (!att.value || att.test(nodeAtt));
	}, true);
}

function matchesId (node, exp) {
	return !exp.id || node.id === exp.id;
}

function matchesPseudos (target, exp) {

	if (!exp.pseudos || exp.pseudos.reduce((result, pseudo) => {
		if (pseudo.name === 'not') {
			return result && !matchExpressions([target], pseudo.expressions, false).length;
		}
		throw new Error('the pseudo selector ' + pseudo.name + ' has not yet been implemented');
	}, true)) {
		return true;
	}
	return false;
}

function matchSelector (targets, exp, recurse) {
	var result = [];

	targets = Array.isArray(targets) ? targets : [targets];
	targets.forEach((target) => {
		if (matchesTag(target.actualNode, exp) &&
			matchesClasses(target.actualNode, exp) &&
			matchesAttributes(target.actualNode, exp) &&
			matchesId(target.actualNode, exp) &&
			matchesPseudos(target, exp)) {
			result.push(target);
		}
		if (recurse) {
			result = result.concat(matchSelector(target.children.filter((child) => {
				return !exp.id || child.shadowId === target.shadowId;
			}), exp, recurse));
		}
	});
	return result;
}

var escapeRegExp = (function(){
	/*! Credit: XRegExp 0.6.1 (c) 2007-2008 Steven Levithan <http://stevenlevithan.com/regex/xregexp/> MIT License */
	var from = /(?=[\-\[\]{}()*+?.\\\^$|,#\s])/g;
	var to = '\\';
	return function(string) {
		return string.replace(from, to);
	};
}());

var reUnescape = /\\/g;

function convertAttributes (atts) {
	/*! Credit Mootools Copyright Mootools, MIT License */
	if (!atts) {
		return;
	}
	return atts.map((att) => {
		// jshint maxcomplexity:12
		var attributeKey = att.name.replace(reUnescape, '');
		var attributeValue = (att.value || '').replace(reUnescape, '');
		var test, regexp;

		switch (att.operator){
			case '^=' :
				regexp = new RegExp('^'+ escapeRegExp(attributeValue));
				break;
			case '$=' :
				regexp = new RegExp(escapeRegExp(attributeValue) +'$');
				break;
			case '~=' :
				regexp = new RegExp('(^|\\s)'+ escapeRegExp(attributeValue) +'(\\s|$)');
				break;
			case '|=' :
				regexp = new RegExp('^'+ escapeRegExp(attributeValue) +'(-|$)');
				break;
			case  '=' :
				test = function(value){
					return attributeValue === value;
				};
				break;
			case '*=' :
				test = function(value){
					return value && value.indexOf(attributeValue) > -1;
				};
				break;
			case '!=' :
				test = function(value){
					return attributeValue !== value;
				};
				break;
			default   :
				test = function(value){
					return !!value;
				};
		}

		if (attributeValue === '' && (/^[*$^]=$/).test(att.operator)) {
			test = function(){
				return false;
			};
		}

		if (!test) {
			test = function(value){
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

function convertClasses (classes) {
	if (!classes) {
		return;
	}
	return classes.map((className) => {
		className = className.replace(reUnescape, '');

		return {
			value: className,
			regexp: new RegExp('(^|\\s)' + escapeRegExp(className) + '(\\s|$)')
		};
	});
}

function convertPseudos (pseudos) {
	if (!pseudos) {
		return;
	}
	return pseudos.map((p) => {
		var expressions;

		if (p.name === 'not') {
			expressions = axe.utils.cssParser.parse(p.value);
			expressions = expressions.selectors ? expressions.selectors : [expressions];
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
convertExpressions = function (expressions) {
	return expressions.map((exp) => {
		var newExp = [];
		var rule = exp.rule;
		while(rule) {
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

matchExpressions = function  (domTree, expressions, recurse) {
	return expressions.reduce((collected, exprArr) => {
		var candidates = domTree;
		exprArr.forEach((exp, index) => {
			recurse = exp.combinator === '>' ? false : recurse;
			if ([' ', '>'].indexOf(exp.combinator) === -1) {
				throw new Error('axe.utils.querySelectorAll does not support the combinator: ' + exp.combinator);
			}
			candidates = candidates.reduce((result, node) => {
				return result.concat(matchSelector(index ? node.children : node, exp, recurse));
			}, []);
		});
		return collected.concat(candidates);
	}, []);
};

/**
 * querySelectorAll implementation that operates on the flattened tree (supports shadow DOM)
 * @method querySelectorAll
 * @memberof axe.utils
 * @instance
 * @param  {NodeList} domTree flattened tree collection to search
 * @param  {String} selector String containing one or more CSS selectors separated by commas
 * @return {NodeList} Elements matched by any of the selectors
 */
axe.utils.querySelectorAll = function (domTree, selector) {
	domTree = Array.isArray(domTree) ? domTree : [domTree];
	var expressions = axe.utils.cssParser.parse(selector);
	expressions = expressions.selectors ? expressions.selectors : [expressions];
	expressions = convertExpressions(expressions);
	return matchExpressions(domTree, expressions, true);
};
