/* global text, aria */
// TODO: Should blacklist so things don't go stale as easilly
var inputTypes = [
	'text',
	'search',
	'tel',
	'url',
	'email',
	'date',
	'time',
	'number',
	'range',
	'color'
];

const controlValueRoles = [
	'textbox',
	'combobox',
	'listbox',
	'progressbar',
	'scrollbar',
	'slider',
	'spinbutton'
];
/**
 * Calculate value of a form element when treated as a value
 * @private
 * @param {VirtualNode} element The VirtualNode instance whose value we want
 * @return {string} The calculated value
 */
text.formControlValue = function formControlValue(virtualNode, context) {
	const { actualNode } = virtualNode;
	const role = aria.getRole(actualNode);
	const nodeName = actualNode.nodeName.toUpperCase();

	if (
		// For the targeted node, the accessible name is never the value:
		context.startNode === virtualNode ||
		// Only elements with a certain role can return their value
		!controlValueRoles.includes(role)
	) {
		return '';
	}

	if (nodeName === 'INPUT' && inputTypes.includes(actualNode.type)) {
		return actualNode.value;
	}

	if (nodeName === 'SELECT') {
		return nativeSelectValue(virtualNode);
	}

	if (nodeName === 'TEXTAREA') {
		return actualNode.value;
	}

	if (['combobox', 'listbox'].includes(role)) {
		return getAriaSelectValue(virtualNode, context);
	}

	return '';
};

function nativeSelectValue({ actualNode }) {
	var opts = actualNode.options;
	if (opts && opts.length) {
		var returnText = '';
		for (var i = 0; i < opts.length; i++) {
			if (opts[i].selected) {
				returnText += ' ' + opts[i].text;
			}
		}
		return text.sanitize(returnText);
	}
	return '';
}

function getAriaSelectValue(virtualNode, context) {
	const selectedQuery = '[role="option"][aria-selected=true]';
	const selected = axe.utils
		.querySelectorAll(virtualNode, selectedQuery)
		.filter(({ actualNode }) => {
			return aria.getRole(actualNode) === 'option';
		})[0]; // there can be only one
	return axe.commons.text.accessibleTextVirtual(selected, context);
}
