/*global aria, dom, text */
/**
 * Gets the accessible ARIA label text of a given element
 * @see http://www.w3.org/WAI/PF/aria/roles#namecalculation
 * @param  {HTMLElement} node The element to test
 * @return {Mixed}      String of visible text, or `null` if no label is found
 */
aria.label = function (node) {
	var ref, candidate;

	if (node.getAttribute('aria-labelledby')) {
		// aria-labelledby
		ref = dom.idrefs(node, 'aria-labelledby');
		candidate = ref.map(function (thing) {
			return thing ? text.visible(thing, true) : '';
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
