const { text, aria, dom } = axe.commons;

const autocomplete = node.getAttribute('autocomplete');
if (!autocomplete || text.sanitize(autocomplete) === '') {
	return false;
}

const nodeName = node.nodeName.toUpperCase();
if (['TEXTAREA', 'INPUT', 'SELECT'].includes(nodeName) === false) {
	return false;
}

// The element is an `input` element a `type` of `hidden`, `button`, `submit` or `reset`
const excludedInputTypes = ['submit', 'reset', 'button', 'hidden'];
if (nodeName === 'INPUT' && excludedInputTypes.includes(node.type)) {
	return false;
}

// The element has a `disabled` or `aria-disabled="true"` attribute
const ariaDisabled = node.getAttribute('aria-disabled') || 'false';
if (node.disabled || ariaDisabled.toLowerCase() === 'true') {
	return false;
}

// The element has `tabindex="-1"` and has a [[semantic role]] that is
//   not a [widget](https://www.w3.org/TR/wai-aria-1.1/#widget_roles)
const role = node.getAttribute('role');
const tabIndex = node.getAttribute('tabindex');
if (tabIndex === '-1' && role) {
	const roleDef = aria.lookupTable.role[role];
	if (roleDef === undefined || roleDef.type !== 'widget') {
		return false;
	}
}

// The element is **not** visible on the page or exposed to assistive technologies
if (
	tabIndex === '-1' &&
	!dom.isVisible(node, false) &&
	!dom.isVisible(node, true)
) {
	return false;
}

return true;
