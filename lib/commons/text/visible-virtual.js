/* global text, dom, axe */

/**
 * NOTE: when calculating the text or accessible text of a node that includes shadow
 * roots attached to it or its children, the flattened tree must be considered
 * rather than the "light DOM"
 * @private
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

/**
 * TODO: Get description and info about screenReader param...
 * @param  {Element} element
 * @param  {Boolean} screenReader When provided, will evaluate visibility from the perspective of a screen reader
 * @param  {Boolean} noRecursing When False, the result will contain text from it's True, the result will contain text from it's own element
 * @return {String}
 */
text.visible = function (element, screenReader, noRecursing) {
	element = axe.utils.getNodeFromTree(axe._tree[0], element);
	return text.visibleVirtual(element, screenReader, noRecursing);
};
