
/**
 * Wrapper for Node#contains; PhantomJS does not support Node#contains and erroneously reports that it does
 * @param  {HTMLElement} node      The candidate container node
 * @param  {HTMLElement} otherNode The node to test is contained by `node`
 * @return {Boolean}           Whether `node` contains `otherNode`
 */
axe.utils.contains = function (node, otherNode) {
	//jshint bitwise: false
	'use strict';

	if (typeof node.contains === 'function') {
		return node.contains(otherNode);
	}

	return !!(node.compareDocumentPosition(otherNode) & 16);

};