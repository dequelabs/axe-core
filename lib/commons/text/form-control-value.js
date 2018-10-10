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

const selectRoles = ['combobox', 'listbox'];
const rangeRoles = ['progressbar', 'scrollbar', 'slider', 'spinbutton'];
const controlValueRoles = ['textbox', ...selectRoles, ...rangeRoles];

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

	if (
		nodeName === 'TEXTAREA' ||
		(nodeName === 'INPUT' && inputTypes.includes(actualNode.type))
	) {
		return actualNode.value;
	}

	if (nodeName === 'SELECT') {
		return nativeSelectValue(virtualNode);
	}

	if (selectRoles.includes(role)) {
		let listbox;
		// For combobox, find the first owned listbox:
		if (role === 'combobox') {
			listbox = aria
				.getOwnedVirtual(virtualNode)
				.filter(elm => aria.getRole(elm) === 'listbox')[0];
		} else {
			// For listbox... its the listbox
			listbox = virtualNode;
		}
		// Can be undefined if no listbox is owned by combobox:
		if (listbox) {
			return getAriaSelectValue(listbox, context);
		}
	}

	if (rangeRoles.includes(role) && actualNode.hasAttribute('aria-valuenow')) {
		return actualNode.getAttribute('aria-valuenow');
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
	const selected = aria
		.getOwnedVirtual(virtualNode)
		.filter(
			owned =>
				aria.getRole(owned) === 'option' &&
				owned.actualNode.getAttribute('aria-selected') === 'true'
		)[0]; // there can be only one

	if (!selected) {
		return '';
	}
	return axe.commons.text.accessibleTextVirtual(selected, context);
}
