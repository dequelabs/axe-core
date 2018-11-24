/* global aria */

/**
 * Get the text value of aria-label, if any
 *
 * @param {VirtualNode|Element} element
 * @return {string} ARIA label
 */
aria.getAriaLabelText = function getAriaLabelText(node) {
	node = node.actualNode || node;
	if (node.nodeType !== 1) {
		return '';
	}
	return node.getAttribute('aria-label') || '';
};
