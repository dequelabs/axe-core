/*global text, dom, axe, aria */
/**
 * Gets the visible text of a label for a given input
 * @see http://www.w3.org/WAI/PF/aria/roles#namecalculation
 * @param  {HTMLElement} node The input to test
 * @return {Mixed}      String of visible text, or `null` if no label is found
 */
text.label = function (node) {
	var ref, candidate;

	candidate = aria.label(node);
	if (candidate) {
		return candidate;
	}

	// explicit label
	if (node.id) {
		ref = document.querySelector('label[for="' + axe.utils.escapeSelector(node.id) + '"]');
		candidate = ref && text.visible(ref, true);
		if (candidate) {
			return candidate;
		}
	}

	ref = dom.findUp(node, 'label');
	candidate = ref && text.visible(ref, true);
	if (candidate) {
		return candidate;
	}

	return null;
};
