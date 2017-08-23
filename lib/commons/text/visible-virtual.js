/*global text, dom, axe */

/**
 * NOTE: when calculating the text or accessible text of a node that includes shadow
 * roots attached to it or its children, the flattened tree must be considered
 * rather than the "light DOM"
 */
text.visibleVirtual = function (element, screenReader, noRecursing) {
	const result = element.children.map(child => {
		if (child.actualNode.nodeType === 3) { // filter on text nodes
			const nodeValue = child.actualNode.nodeValue;
			if (nodeValue && dom.isVisible(element.actualNode, screenReader)) {
				return nodeValue;
			}

		} else if (!noRecursing) {
			return text.visibleVirtual(child, screenReader);
		}
	}).join('');
	return text.sanitize(result);
};

text.visible = function (element, screenReader, noRecursing) {
	element = axe.utils.getNodeFromTree(axe._tree[0], element);
	return text.visibleVirtual(element, screenReader, noRecursing);
};
