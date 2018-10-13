/* global aria */
aria.getAriaLabelText = function getAriaLabelText(node) {
	node = node.actualNode || node;
	if (node.nodeType !== 1) {
		return '';
	}
	return node.getAttribute('aria-label') || '';
};
