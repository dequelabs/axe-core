/* global dom, text */

/**
 * Gets the accessible ARIA label text of a given element
 * @see http://www.w3.org/WAI/PF/aria/roles#namecalculation
 * @method labelVirtual
 * @memberof axe.commons.aria
 * @instance
 * @param  {Object} actualNode The virtualNode to test
 * @return {Mixed}  String of visible text, or `null` if no label is found
 */
function labelVirtual({ actualNode }) {
	let ref, candidate;

	if (actualNode.getAttribute('aria-labelledby')) {
		// aria-labelledby
		// TODO: es-module-dom.idrefs
		ref = dom.idrefs(actualNode, 'aria-labelledby');
		candidate = ref
			.map(function(thing) {
				// TODO: es-module-utils.getNodeFromTree
				const vNode = axe.utils.getNodeFromTree(thing);
				// TODO: es-module-text.visibleVirtual
				return vNode ? text.visibleVirtual(vNode, true) : '';
			})
			.join(' ')
			.trim();

		if (candidate) {
			return candidate;
		}
	}

	// aria-label
	candidate = actualNode.getAttribute('aria-label');
	if (candidate) {
		// TODO: es-module-text.sanitize
		candidate = text.sanitize(candidate).trim();
		if (candidate) {
			return candidate;
		}
	}

	return null;
}

export default labelVirtual;
