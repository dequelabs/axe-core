/**
 * Note:
 * Check
 * - if element is focusable
 * - if element is in focus order via `tabindex`
 */
if (node.getAttribute('contenteditable')) {
	return true;
}

const isFocusable = virtualNode.isFocusable;
let tabIndex = parseInt(virtualNode.actualNode.getAttribute('tabindex'), 10);
tabIndex = !isNaN(tabIndex) ? tabIndex : null;

return tabIndex ? isFocusable && tabIndex >= 0 : isFocusable;
