/* global aria, text */
aria.getAriaLabelText = function getAriaLabelText(node) {
	node = node.actualNode || node;
	if (node.nodeType !== 1) {
		return '';
	}
	var label = node && node.getAttribute('aria-label');
	return label ? text.sanitize(label) : '';
};
