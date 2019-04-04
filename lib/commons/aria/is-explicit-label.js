/* global aria, dom, text */

/**
 * Note:
 * This method is well tested via the check `explicit-label`
 * See - `test/checks/label/explicit.js`
 */

/**
 * Check if given element has `explicit` label
 * @method isExplicitLabel
 * @memberof axe.commons.aria
 * @param {HTMLElement} node element
 * @return {Boolean}
 */
aria.isExplicitLabel = function(node) {
	if (!node.getAttribute('id')) {
		return false;
	}

	const root = dom.getRootNode(node);
	const id = axe.utils.escapeSelector(node.getAttribute('id'));
	const label = root.querySelector(`label[for="${id}"]`);

	if (!label) {
		return false;
	}

	if (!dom.isVisible(label)) {
		return true;
	}

	return !!text.accessibleText(label);
};
