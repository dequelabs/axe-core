/* global text, dom */

/**
 * Returns the visible text of the node
 *
 * @method visible
 * @memberof axe.commons.text
 * @instance
 * @param {Element} element
 * @param {Boolean} screenReader When provided, will evaluate visiblility from the perspective of a screen reader
 * @param {Boolean} noRecursing When False, the result will contain text from the element and it's children.
 * When True, the result will only contain text from the element
 * @return {String}
 */
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
