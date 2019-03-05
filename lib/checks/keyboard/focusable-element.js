/**
 * Note:
 * Check
 * - if element is focusable
 * - if element is in focus order via `tabindex`
 */
const isFocusable = virtualNode.isFocusable;

let tabIndex = virtualNode.actualNode.getAttribute('tabindex');
tabIndex =
	tabIndex && !isNaN(parseInt(tabIndex, 10)) ? parseInt(tabIndex) : null;

return tabIndex ? isFocusable && tabIndex >= 0 : isFocusable;
