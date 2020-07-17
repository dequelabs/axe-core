/**
 * Gets a unique CSS selector
 * @param {HTMLElement} node The element to get the selector for
 * @param {Object} optional options
 * @returns {String|Array<String>} Unique CSS selector for the node
 */
function getShadowSelector(generateSelector, elm, options = {}) {
	if (!elm) {
		return '';
	}
	// DOCUMENT_NODE
	let doc = (elm.getRootNode && elm.getRootNode()) || document;
	if (doc.nodeType === 9) {
		return generateSelector(elm, options, doc);
	}

	// DOCUMENT_FRAGMENT - shadow DOM
	let stack = [];
	while (doc.nodeType === 11) {
		if (!doc.host) {
			return '';
		}
		stack.unshift({ elm, doc });
		elm = doc.host;
		doc = elm.getRootNode();
	}

	stack.unshift({ elm, doc });
	return stack.map(({ elm, doc }) => generateSelector(elm, options, doc));
}

export default getShadowSelector;
