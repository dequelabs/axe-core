/* global axe, color */

/**
 * Returns the flattened foreground color of an element, or null if it can't be determined because
 * of transparency
 * @method getForegroundColor
 * @memberof axe.commons.color
 * @instance
 * @param {Element} node
 * @param {Boolean} noScroll (default false)
 * @return {Color|null}
 */
color.getForegroundColor = function(node, noScroll) {
	const nodeStyle = window.getComputedStyle(node);

	const fgColor = new color.Color();
	fgColor.parseRgbString(nodeStyle.getPropertyValue('color'));
	const opacity = nodeStyle.getPropertyValue('opacity');
	fgColor.alpha = fgColor.alpha * opacity;
	if (fgColor.alpha === 1) {
		return fgColor;
	}

	const bgColor = color.getBackgroundColor(node, [], noScroll);
	if (bgColor === null) {
		const reason = axe.commons.color.incompleteData.get('bgColor');
		axe.commons.color.incompleteData.set('fgColor', reason);
		return null;
	}

	return color.flattenColors(fgColor, bgColor);
};
