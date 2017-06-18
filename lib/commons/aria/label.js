/*global axe, aria, dom, text */
/**
 * Gets the accessible ARIA label text of a given element
 * @see http://www.w3.org/WAI/PF/aria/roles#namecalculation
 * @param  {Object} node The virtual DOM node to test
 * @return {Mixed}      String of visible text, or `null` if no label is found
 */
aria.label = function (node) {
	var ref, candidate;

	if (node.actualNode.getAttribute('aria-labelledby')) {
		// aria-labelledby
		ref = dom.idrefs(node.actualNode, 'aria-labelledby');
		candidate = ref.map(function (thing) {
			var vNode = axe.utils.getNodeFromTree(axe._tree[0], thing);
			return vNode ? text.visible(vNode, true) : '';
		}).join(' ').trim();

		if (candidate) {
			return candidate;
		}
	}

	// aria-label
	candidate = node.actualNode.getAttribute('aria-label');
	if (candidate) {
		candidate = text.sanitize(candidate).trim();
		if (candidate) {
			return candidate;
		}
	}

	return null;
};
