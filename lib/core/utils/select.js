/**
 * Get the deepest node in a given collection
 * @private
 * @param  {Array} collection Array of nodes to test
 * @return {Node}             The deepest node
 */
function getDeepest(collection) {
	'use strict';

	return collection.sort(function (a, b) {
		if (axe.utils.contains(a, b)) {
			return 1;
		}
		return -1;
	})[0];

}

/**
 * Determines if a node is included or excluded in a given context
 * @private
 * @param  {Node}  node     The node to test
 * @param  {Object}  context "Resolved" context object, @see resolveContext
 * @return {Boolean}         [description]
 */
function isNodeInContext(node, context) {
	'use strict';

	var include = context.include && getDeepest(context.include.filter(function (candidate) {
		return axe.utils.contains(candidate, node);
	}));
	var exclude = context.exclude && getDeepest(context.exclude.filter(function (candidate) {
		return axe.utils.contains(candidate, node);
	}));
	if ((!exclude && include) || (exclude && axe.utils.contains(exclude, include))) {
		return true;
	}
	return false;
}

/**
 * Pushes unique nodes that are in context to an array
 * @private
 * @param  {Array} result  The array to push to
 * @param  {Array} nodes   The list of nodes to push
 * @param  {Object} context The "resolved" context object, @see resolveContext
 */
function pushNode(result, nodes, context) {
	'use strict';

	for (var i = 0, l = nodes.length; i < l; i++) {
		if (result.indexOf(nodes[i]) === -1 && isNodeInContext(nodes[i], context)) {
			result.push(nodes[i]);
		}
	}
}

/**
 * Selects elements which match `select` that are included and excluded via the `Context` object
 * @param  {String} selector  CSS selector of the HTMLElements to select
 * @param  {Context} context  The "resolved" context object, @see Context
 * @return {Array}            Matching nodes sorted by DOM order
 */
axe.utils.select = function select(selector, context) {
	'use strict';

	var result = [], candidate;
	for (var i = 0, l = context.include.length; i < l; i++) {
		candidate = context.include[i];
		if (candidate.nodeType === candidate.ELEMENT_NODE && axe.utils.matchesSelector(candidate, selector)) {
			pushNode(result, [candidate], context);
		}
		pushNode(result, candidate.querySelectorAll(selector), context);
	}

	return result.sort(axe.utils.nodeSorter);
};
