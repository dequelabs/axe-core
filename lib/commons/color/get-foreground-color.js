/*global axe, color */

/**
 * Returns the flattened foreground color of an element, or null if it can't be determined because
 * of transparency
 * @param {Element} node
 * @param {Boolean} noScroll (default false)
 * @return {Color}
 */
color.getForegroundColor = function (node, noScroll) {
	var nodeStyle = window.getComputedStyle(node);

	var fgColor = new color.Color();
	fgColor.parseRgbString(nodeStyle.getPropertyValue('color'));
	var opacity = nodeStyle.getPropertyValue('opacity');
	fgColor.alpha = fgColor.alpha * opacity;
	if (fgColor.alpha === 1) { return fgColor; }

	var bgColor = color.getBackgroundColor(node, [], noScroll);
	if (bgColor === null) {
		var reason = axe.commons.color.incompleteData.get('bgColor').reason;
		axe.commons.color.incompleteData.set('fgColor', {
			reason: reason
		});
		return null;
	}

	return color.flattenColors(fgColor, bgColor);
};
