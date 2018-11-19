const { getComposedParent } = axe.commons.dom;

function shouldMatchElement(el) {
	if (!el) {
		return true;
	}
	const ariaHiddenValue = el.getAttribute('aria-hidden')
		? el.getAttribute('aria-hidden')
		: null;
	if (ariaHiddenValue === null) {
		return shouldMatchElement(getComposedParent(el));
	}
	return false;
}

return shouldMatchElement(getComposedParent(node));
