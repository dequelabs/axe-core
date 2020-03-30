/**
 * closest implementation that operates on a VirtualNode
 *
 * @method closest
 * @memberof axe.utils
 * @param {VirtualNode} vNode VirtualNode to match
 * @param {String} selector CSS selector string
 * @return {Boolean}
 */
axe.utils.closest = function closest(vNode, selector) {
	while (vNode) {
		if (axe.utils.matches(vNode, selector)) {
			return vNode;
		}

		vNode = vNode.parent;
	}

	return null;
};
