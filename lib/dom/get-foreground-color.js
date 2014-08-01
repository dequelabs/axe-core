/*global dom, color */

/**
 * Returns the flattened foreground color of an element, or null if it can't be determined because
 * of transparency
 * @param {Element} node
 * @return {Color}
 */
dom.getForegroundColor = function (node) {
	var dv = node.ownerDocument.defaultView,
		nodeStyle = dv.getComputedStyle(node);

	var fgColor = new color.Color();
	fgColor.parseRgbString(nodeStyle.getPropertyValue('color'));
	var opacity = nodeStyle.getPropertyValue('opacity');
	fgColor.alpha = fgColor.alpha * opacity;
	if (fgColor.alpha === 1) { return fgColor; }

	var bgColor = dom.getBackgroundColor(node);
	if (bgColor === null) { return null; }

	return color.flattenColors(fgColor, bgColor);
};
