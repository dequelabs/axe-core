/*global axe, aria, dom, text */
/**
 * Gets the accessible ARIA label text of a given element
 * @see http://www.w3.org/WAI/PF/aria/roles#namecalculation
 * @param  {Object} node	The DOM node to test
 * @return {Mixed}      	String of visible text, or `null` if no label is found
 */
aria.label = function (node) {
	let ref, candidate;

	if (node.getAttribute('aria-labelledby')) {
		// aria-labelledby
		ref = dom.idrefs(node, 'aria-labelledby');
		candidate = ref.map(function (thing) {
			const vNode = axe.utils.getNodeFromTree(axe._tree[0], thing);
			return vNode ? text.visibleVirtual(vNode, true) : '';
		}).join(' ').trim();

		if (candidate) {
			return candidate;
		}
	}

	// aria-label
	candidate = node.getAttribute('aria-label');
	if (candidate) {
		candidate = text.sanitize(candidate).trim();
		if (candidate) {
			return candidate;
		}
	}

	return null;
};
