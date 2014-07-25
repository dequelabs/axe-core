/*global dom, color */

/**
 * Returns the flattened background color of an element, or null if it can't be determined because
 * there is no opaque ancestor element visually containing it, or because background images are used.
 * @param {Element} node
 * @return {Color}
 */
dom.getBackgroundColor = function (node) {
	var dv = node.ownerDocument.defaultView,
		nodeStyle = dv.getComputedStyle(node);
	if (nodeStyle.getPropertyValue('background-image') !== 'none') {
		return null;
	}

	var bgColor = new color.Color();
	bgColor.parseRgbString(nodeStyle.getPropertyValue('background-color'));
	var opacity = nodeStyle.getPropertyValue('opacity');
	bgColor.alpha = bgColor.alpha * opacity;
	if (bgColor.alpha === 1) { return bgColor; }

	var parent = node.parentNode;
	if (parent === null) { return null; }
	if (!dom.visuallyContains(node, parent)) { return null; }

	var parentColor = dom.getBackgroundColor(parent);
	if (parentColor === null) { return null; }

	return color.flattenColors(bgColor, parentColor);
};
