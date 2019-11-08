/**
 * Determines if element is an instance of Node
 * @method isNode
 * @memberof axe.commons.dom
 * @instance
 * @param  {Element} element
 * @return {Boolean}
 */
function isNode(element) {
	'use strict';
	return element instanceof Node;
}

export default isNode;
