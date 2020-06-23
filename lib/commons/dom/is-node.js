/**
 * Determines if element is an instance of Node
 * @method isNode
 * @memberof axe.commons.dom
 * @instance
 * @deprecated
 * @param  {Element} element
 * @return {Boolean}
 */
function isNode(element) {
	'use strict';
	return element instanceof window.Node;
}

export default isNode;
