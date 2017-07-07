/*global text, dom */

/**
 * NOTE: when calculating the text or accessible text of a node that includes shadow
 * roots attached to it or its children, the flattened tree must be considered
 * rather than the "light DOM"
 */

text.visible = function (element, screenReader, noRecursing) {
	'use strict';

	var index, child, nodeValue,
		childNodes = element.children,
		length = childNodes.length,
		result = '';

	for (index = 0; index < length; index++) {
		child = childNodes[index];

		if (child.actualNode.nodeType === 3) { // filter on text nodes
			nodeValue = child.actualNode.nodeValue;
			if (nodeValue && dom.isVisible(element.actualNode, screenReader)) {
				result += nodeValue;
			}
		} else if (!noRecursing) {
			result += text.visible(child, screenReader);
		}
	}

	return text.sanitize(result);
};
