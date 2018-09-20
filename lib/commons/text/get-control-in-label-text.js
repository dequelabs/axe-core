/* global text */

/**
 * Calculate value of a form element when treated as a value
 * @private
 * @param {VirtualNode} element The VirtualNode instance whose value we want
 * @return {string} The calculated value
 */
text.getControlInLabelText = function getControlInLabelText(element, context) {
	if (context.controlInLabel) {
		return '';
	}
	var label = axe.commons.dom.findUpVirtual(element, 'label');
	if (!label) {
		return '';
	}
	return axe.commons.text.accessibleText(label, {
		controlInLabel: true,
		...context
	});
};
