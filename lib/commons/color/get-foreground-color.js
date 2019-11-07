import flattenColors from './flatten-colors.js';
import getBackgroundColor from './get-background-color.js';
import Color from './color.js';
import incompleteData from './incomplete-data.js';

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
function getForegroundColor(node, noScroll) {
	var nodeStyle = window.getComputedStyle(node);

	var fgColor = new Color();
	fgColor.parseRgbString(nodeStyle.getPropertyValue('color'));
	var opacity = nodeStyle.getPropertyValue('opacity');
	fgColor.alpha = fgColor.alpha * opacity;
	if (fgColor.alpha === 1) {
		return fgColor;
	}

	var bgColor = getBackgroundColor(node, [], noScroll);
	if (bgColor === null) {
		var reason = incompleteData.get('bgColor');
		incompleteData.set('fgColor', reason);
		return null;
	}

	return flattenColors(fgColor, bgColor);
}

export default getForegroundColor;
