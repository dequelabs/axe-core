/*global text, dom, axe, aria */
/**
 * Gets the visible text of a label for a given input
 * @see http://www.w3.org/WAI/PF/aria/roles#namecalculation
 * @param  {Object} node The virtual node mapping to the input to test
 * @return {Mixed}      String of visible text, or `null` if no label is found
 */
text.labelVirtual = function (node) {
	var ref, candidate, doc;

	candidate = aria.labelVirtual(node);
	if (candidate) {
		return candidate;
	}

	// explicit label
	if (node.actualNode.id) {
		const id = axe.commons.utils.escapeSelector(node.actualNode.getAttribute('id'));
		doc = axe.commons.dom.getRootNode(node.actualNode);
		ref = doc.querySelector('label[for="' + id + '"]');
		candidate = ref && text.visible(ref, true);
		if (candidate) {
			return candidate;
		}
	}

	ref = dom.findUp(node.actualNode, 'label');
	candidate = ref && text.visible(ref, true);
	if (candidate) {
		return candidate;
	}

	return null;
};

text.label = function (node) {
	node = axe.utils.getNodeFromTree(axe._tree[0], node);
	return text.labelVirtual(node);
};
