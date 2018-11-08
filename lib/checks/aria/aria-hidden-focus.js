function getElmsIncludingShadowDOM(node, elms = []) {
	// Note: can be moved to a utility fn, when the need arises
	const nodes = node.querySelectorAll('*');

	if (!nodes || (!nodes.length && axe.utils.isShadowRoot(node))) {
		getElmsIncludingShadowDOM(node.shadowRoot, elms);
	}

	for (let i = 0, el; (el = nodes[i]); ++i) {
		elms.push(el);
		if (axe.utils.isShadowRoot(el)) {
			getElmsIncludingShadowDOM(el.shadowRoot, elms);
		}
	}

	return elms;
}

const children = getElmsIncludingShadowDOM(node);
const elements = [node].concat(children);
const result = elements.every(el => {
	const isElFocusable = axe.commons.dom.isFocusable(el);
	let tabIndex = el.getAttribute('tabindex');
	tabIndex =
		tabIndex && !isNaN(parseInt(tabIndex, 10)) ? parseInt(tabIndex) : null;
	if (isElFocusable && (tabIndex && tabIndex < 0)) {
		return true;
	}
	return isElFocusable === false;
});

if (!result) {
	this.relatedNodes(children);
}

return result;
