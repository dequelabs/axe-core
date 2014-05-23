/**
 * Get the deepest node in a given collection
 * @private
 * @param  {Array} collection Array of nodes to test
 * @return {Node}             The deepest node
 */
function getDeepest(collection) {
	'use strict';

	return collection.sort(function (a, b) {
		if (a.contains(b)) {
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
		return candidate.contains(node);
	}));
	var exclude = context.exclude && getDeepest(context.exclude.filter(function (candidate) {
		return candidate.contains(node);
	}));
	if ((!exclude && include) || (exclude && exclude.contains(include))) {
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
 * Sorts nodes by DOM order
 * @private
 * @param  {Node} a
 * @param  {Node} b
 * @return {Integer}   @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/Sort
 */
function nodeSorter(a, b) {
	/*jshint bitwise: false */

	'use strict';

	if (a.compareDocumentPosition(b) & 4) { // a before b
		return -1;
	}

	return 1; // b before a

}

utils.select = function select(selector, context) {
	'use strict';

	var result = [];
	for (var i = 0, l = context.include.length; i < l; i++) {
		pushNode(result, context.include[i].querySelectorAll(selector), context);
	}

	return result.sort(nodeSorter);
};