/**
 * Note:
 * Check
 * - if element is focusable
 * - if element is in focus order via `tabindex`
 */
if (node.hasAttribute('contenteditable') && isContenteditable(node)) {
	return true;
}

const isFocusable = virtualNode.isFocusable;
let tabIndex = parseInt(virtualNode.actualNode.getAttribute('tabindex'), 10);
tabIndex = !isNaN(tabIndex) ? tabIndex : null;

return tabIndex ? isFocusable && tabIndex >= 0 : isFocusable;

// contenteditable is focusable when it is an empty string (whitespace
// is not considered empty) or "true". if the value is "false"
// you can't edit it, but if it's anything else it inherits the value
// from the first valid ancestor
// @see https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/contenteditable
function isContenteditable(node) {
	const contenteditable = node.getAttribute('contenteditable');
	if (contenteditable === 'true' || contenteditable === '') {
		return true;
	}

	if (contenteditable === 'false') {
		return false;
	}

	const ancestor = axe.commons.dom.findUpVirtual(
		virtualNode.parent,
		'[contenteditable]'
	);
	if (!ancestor) {
		return false;
	}

	return isContenteditable(ancestor);
}
