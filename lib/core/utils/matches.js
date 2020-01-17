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
			var nodeAtt = vNode.attr(att.key);
			return nodeAtt !== null && (!att.value || att.test(nodeAtt));
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
				return !axe.utils.matchesExpression(target, pseudo.expressions[0]);
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
axe.utils.matchesExpression = function matchesExpression(
	vNode,
	expressions,
	matchAnyParent
) {
	let exps = [].concat(expressions);
	let expression = exps.pop();
	let matches = matchExpression(vNode, expression);

	while (!matches && matchAnyParent && vNode.parent) {
		vNode = vNode.parent;
		matches = matchExpression(vNode, expression);
	}

	if (exps.length) {
		if ([' ', '>'].includes(expression.combinator) === false) {
			throw new Error(
				'axe.utils.matchesExpression does not support the combinator: ' +
					expression.combinator
			);
		}

		matches =
			matches &&
			axe.utils.matchesExpression(
				vNode.parent,
				exps,
				expression.combinator === ' '
			);
	}

	return matches;
};

/**
 * matches implementation that operates on a VirtualNode
 *
 * @method matches
 * @memberof axe.utils
 * @param {VirtualNode} vNode VirtualNode to match
 * @param {String} selector CSS selector string
 * @return {Boolean}
 */
axe.utils.matches = function matches(vNode, selector) {
	let expressions = axe.utils.convertSelector(selector);
	return axe.utils.matchesExpression(vNode, expressions[0]);
};
