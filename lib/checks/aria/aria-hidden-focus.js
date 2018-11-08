function getElmsIncludingShadowDOM(nodes, elms = []) {
	// Note: can be moved to a utility fn, when the need arises
	for (let i = 0, el; (el = nodes[i]); ++i) {
		elms.push(el);
		if (axe.utils.isShadowRoot(el)) {
			// recursive look up if elm has shadowRoot
			getElmsIncludingShadowDOM(el.shadowRoot.querySelectorAll('*'), elms);
		}
	}
	return elms;
}

const children = getElmsIncludingShadowDOM(node.querySelectorAll('*'));
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
