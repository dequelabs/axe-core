
/**
 * Wrapper for Node#contains; PhantomJS does not support Node#contains and erroneously reports that it does
 * @method contains
 * @memberof axe.utils
 * @instance
 * @param  {HTMLElement} node      The candidate container node
 * @param  {HTMLElement} otherNode The node to test is contained by `node`
 * @return {Boolean}           Whether `node` contains `otherNode`
 */
axe.utils.contains = function (node, otherNode) {
	//jshint bitwise: false
	'use strict';
	function containsShadowChild(node, otherNode) {
		if (node.shadowId === otherNode.shadowId) {
			return true;
		}
		return !!node.children.find((child) => {
			return containsShadowChild(child, otherNode);
		});
	}

	if ((node.shadowId || otherNode.shadowId)) {
		return containsShadowChild(node, otherNode);
	}

	if (typeof node.actualNode.contains === 'function') {
		return node.actualNode.contains(otherNode.actualNode);
	}

	return !!(node.actualNode.compareDocumentPosition(otherNode.actualNode) & 16);

};
