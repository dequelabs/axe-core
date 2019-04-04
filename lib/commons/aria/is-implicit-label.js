/* global aria, dom, text */

/**
 * Note:
 * This method is well tested via the check `implicit-label`
 * See - `test/checks/label/implicit.js`
 */

/**
 * Check if given element has `implicit` label
 * @method isImplicitLabel
 * @memberof axe.commons.aria
 * @param {Object} virtualNode virtualNode
 * @return {Boolean}
 */
aria.isImplicitLabel = function(virtualNode) {
	const label = dom.findUpVirtual(virtualNode, 'label');

	if (!label) {
		return false;
	}

	return !!text.accessibleText(label, { inControlContext: true });
};
