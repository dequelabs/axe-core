/*global dom */
/*jshint maxcomplexity: 20 */

const visualRoles = [
	'checkbox', 'img', 'radio', 'range',
	'slider', 'spinbutton', 'textbox',
];

/**
 * Check if an element is an inherently visual element
 * @method isVisualContent
 * @memberof axe.commons.dom
 * @instance
 * @param  {Element} element The element to check
 * @return {Boolean}
 */
dom.isVisualContent = function (element) {
	const role = element.getAttribute('role');
	if (role) {
		return (visualRoles.indexOf(role) !== -1);
	}

	switch (element.tagName.toUpperCase()) {
		case 'IMG':
		case 'IFRAME':
		case 'OBJECT':
		case 'VIDEO':
		case 'AUDIO':
		case 'CANVAS':
		case 'SVG':
		case 'MATH':
		case 'BUTTON':
		case 'SELECT':
		case 'TEXTAREA':
		case 'KEYGEN':
		case 'PROGRESS':
		case 'METER':
			return true;
		case 'INPUT':
			return element.type !== 'hidden';
		default:
			return false;
	}

};
