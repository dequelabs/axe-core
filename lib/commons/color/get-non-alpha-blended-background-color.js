/* global color */

/**
 * Returns the non-alpha-blended background color of an element
 *
 * @method getNonAlphaBlendedBackgroundColor
 * @memberof axe.commons.color
 *
 * @param {Element} elm
 * @return {Color}
 */
color.getNonAlphaBlendedBackgroundColor = function getNonAlphaBlendedBackgroundColor(
	elm,
	elmStyle
) {
	elmStyle = elmStyle || window.getComputedStyle(elm);

	let bgColor = new color.Color();
	bgColor.parseRgbString(elmStyle.getPropertyValue('background-color'));

	if (bgColor.alpha !== 0) {
		let opacity = elmStyle.getPropertyValue('opacity');
		bgColor.alpha = bgColor.alpha * opacity;
	}

	return bgColor;
};
