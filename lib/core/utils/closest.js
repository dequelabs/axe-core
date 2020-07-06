import matches from './matches';

/**
 * closest implementation that operates on a VirtualNode
 *
 * @method closest
 * @memberof axe.utils
 * @param {VirtualNode} vNode VirtualNode to match
 * @param {String} selector CSS selector string
 * @return {VirtualNode | null}
 */
function closest(vNode, selector) {
	while (vNode) {
		if (matches(vNode, selector)) {
			return vNode;
		}

		vNode = vNode.parent;
	}

	return null;
}

export default closest;
