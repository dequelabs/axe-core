/**
 * querySelectorAll implementation that works on the virtual DOM and
 * supports shadowDOM
 */

// todo: implement an option to follow aria-owns

function matchesTag (node, exp) {
	return exp.tag === '*' || node.nodeName.toLowerCase() === exp.tag;
}

function matchesClasses (node, exp) {
	return !exp.classes || exp.classes.reduce((result, cl) => {
		return result && (node.className && node.className.match(cl.regexp));
	}, true);
}

function matchesAttributes (node, exp) {
	return !exp.attributes || exp.attributes.reduce((result, att) => {
		var nodeAtt = node.getAttribute(att.key);
		return result && nodeAtt && att.test(nodeAtt);
	}, true);
}

function matchesId (node, exp) {
	return !exp.id || node.id === exp.id;
}

function matchSelector (targets, exp, recurse) {
	var result = [];

	if (exp.pseudos) {
		throw new Error('matchSelector does not support pseudo selector: ' + exp.pseudos[0].key);
	}
	targets = Array.isArray(targets) ? targets : [targets];
	targets.forEach((target) => {
		if (matchesTag(target.actualNode, exp) &&
			matchesClasses(target.actualNode, exp) &&
			matchesAttributes(target.actualNode, exp) &&
			matchesId(target.actualNode, exp)) {
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

axe.utils.querySelectorAll = function (domTree, selector) {
	domTree = Array.isArray(domTree) ? domTree : [domTree];

	return axe.utils.cssParser(selector).expressions.reduce((collected, exprArr) => {
		var candidates = domTree;
		exprArr.forEach((exp, index) => {
			var recurse = exp.combinator === '>' ? false : true;
			if ([' ', '>'].indexOf(exp.combinator) === -1) {
				throw new Error('axe.utils.querySelectorAll does not support the combinator: ' + exp.combinator);
			}
			exp.tag = exp.tag.toLowerCase(); // do this once
			candidates = candidates.reduce((result, node) => {
				return result.concat(matchSelector(index ? node.children : node, exp, recurse));
			}, []);
		});
		return collected.concat(candidates);
	}, []);
};