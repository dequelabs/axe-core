/*global color */

/**
 * Returns the flattened foreground color of an element, or null if it can't be determined because
 * of transparency
 * @param {Element} node
 * @param {Boolean} useScroll
 * @return {Color}
 */
color.getForegroundColor = function (node, useScroll) {
	var nodeStyle = window.getComputedStyle(node);

	var fgColor = new color.Color();
	fgColor.parseRgbString(nodeStyle.getPropertyValue('color'));
	var opacity = nodeStyle.getPropertyValue('opacity');
	fgColor.alpha = fgColor.alpha * opacity;
	if (fgColor.alpha === 1) { return fgColor; }

	var bgColor = color.getBackgroundColor(node, [], useScroll);
	if (bgColor === null) { return null; }

	return color.flattenColors(fgColor, bgColor);
};
