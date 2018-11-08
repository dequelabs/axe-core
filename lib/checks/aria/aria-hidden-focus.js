function getAllElmsIncludingShadowDOM(nodes, elms = []) {
	// TODO: perhaps can be moved to a utility fn, when the need arises
	for (let i = 0, el; (el = nodes[i]); ++i) {
		elms.push(el);
		if (axe.utils.isShadowRoot(el)) {
			// recursive look up if elm has shadowRoot
			getAllElmsIncludingShadowDOM(el.shadowRoot.querySelectorAll('*'), elms);
		}
	}
	return elms;
}

const { dom } = axe.commons;
let elements = [node].concat(
	getAllElmsIncludingShadowDOM(node.querySelectorAll('*'))
);

const result = elements.every(element => {
	const output = dom.isFocusable(element, false) === false;
	return output;
});

return result;
