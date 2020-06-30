import Color from './color';

/**
 * Get text-shadow colors that can impact the color contrast of the text
 * @param {Element} node  DOM Element
 * @param	{Array}	 [bgElms=[]] Colors used in text-shadow
 */
function getTextShadowColors(node) {
	const textShadowRegex = /(rgba?\([0-9,.\s]*\))\s+([0-9.]+)px\s+([0-9.]+)px\s+([0-9.]+)px/g;
	const style = window.getComputedStyle(node);
	const textShadow = style.getPropertyValue('text-shadow');
	if (textShadow === 'none') {
		return [];
	}

	const shadowMatches = [];
	let match; // Poor man's str.matchAll:
	while ((match = textShadowRegex.exec(textShadow))) {
		shadowMatches.push(match);
	}

	const shadows = shadowMatches.map(match => ({
		colorStr: match[1],
		offsetX: parseInt(match[2]),
		offsetY: parseInt(match[3]),
		blurRadius: parseInt(match[4])
	}));
	return shadows.map(textShadowColor);
}

function textShadowColor({ colorStr, offsetX, offsetY, blurRadius }) {
	if (offsetX > blurRadius || offsetY > blurRadius) {
		// Shadow is too far removed from the text to impact contrast
		return new Color(0, 0, 0, 0);
	}

	const shadowColor = new Color();
	shadowColor.parseRgbString(colorStr);
	shadowColor.alpha *= blurRadiusToAlpha(blurRadius);

	return shadowColor;
}

function blurRadiusToAlpha(blurRadius) {
	// This formula is an estimate based on various tests.
	// Different people test this differently, so opinions may vary.
	return 3.7 / (blurRadius + 8);
}

export default getTextShadowColors;
