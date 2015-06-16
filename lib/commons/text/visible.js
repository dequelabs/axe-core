/*global text, dom */

text.visible = function (element, screenReader, noRecursing) {
	'use strict';

	var index, child, nodeValue,
		childNodes = element.childNodes,
		length = childNodes.length,
		result = '';

	for (index = 0; index < length; index++) {
		child = childNodes[index];

		if (child.nodeType === 3) {
			nodeValue = child.nodeValue;
			if (nodeValue && dom.isVisible(element, screenReader)) {
				result += child.nodeValue;
			}
		} else if (!noRecursing) {
			result += text.visible(child, screenReader);
		}
	}

	return text.sanitize(result);
};
