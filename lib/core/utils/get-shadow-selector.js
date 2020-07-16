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
	let doc = (elm.getRootNode && elm.getRootNode()) || document;
	if (doc.nodeType === 11) {
		// DOCUMENT_FRAGMENT
		let stack = [];
		while (doc.nodeType === 11) {
			if (!doc.host) {
				return '';
			}
			stack.push({ elm: elm, doc: doc });
			elm = doc.host;
			doc = elm.getRootNode();
		}
		stack.push({ elm: elm, doc: doc });
		return stack.reverse().map(comp => {
			return generateSelector(comp.elm, options, comp.doc);
		});
	} else {
		return generateSelector(elm, options, doc);
	}
}

export default getShadowSelector;
