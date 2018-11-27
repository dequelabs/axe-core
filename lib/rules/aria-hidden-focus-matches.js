const { getComposedParent } = axe.commons.dom;

function shouldMatchElement(el) {
	if (!el) {
		return true;
	}
	if (el.getAttribute('aria-hidden') === 'true') {
		return false;
	}
	return shouldMatchElement(getComposedParent(el));
}

return shouldMatchElement(getComposedParent(node));
