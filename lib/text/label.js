/*global text, dom, utils */
/*jshint maxstatements: false */
/**
 * Gets the visible text of a label for a given input
 * @see http://www.w3.org/WAI/PF/aria/roles#namecalculation
 * @param  {HTMLElement} node The input to test
 * @return {Mixed}      String of visible text, or `null` if no label is found
 */
text.label = function (node) {
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

	// explicit label
	if (node.id) {
		ref = document.querySelector('label[for="' + utils.escapeSelector(node.id) + '"]');
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