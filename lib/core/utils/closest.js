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

		// // if we do not have a complete tree (i.e. liniting context)
		// // we cannot guarantee a needed parent exists
		// if (!vNode.parent && vNode.props.nodeName !== 'html') {
		//   throw new TypeError('Cannot resolve parent for non-DOM nodes');
		// }

		vNode = vNode.parent;
	}

	return null;
}

export default closest;
