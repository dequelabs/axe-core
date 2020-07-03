import Color from './color';
import assert from '../../core/utils/assert';

/**
 * Get text-shadow colors that can impact the color contrast of the text
 * @param {Element} node  DOM Element
 * @param	{Array}	 [bgElms=[]] Colors used in text-shadow
 */
function getTextShadowColors(node) {
	const style = window.getComputedStyle(node);
	const textShadow = style.getPropertyValue('text-shadow');
	if (textShadow === 'none') {
		return [];
	}

	const shadows = parseTextShadows(textShadow);
	return shadows.map(textShadowColor);
}

/**
 * Parse text-shadow property value. Required for IE, which can return the color
 * either at the start or the end, and either in rgb(a) or as a named color
 */
function parseTextShadows(textShadow) {
	let current = { pixels: [] };
	let str = textShadow.trim();
	const shadows = [current];
	if (!str) {
		return [];
	}

	while (str) {
		let colorMatch =
			str.match(/^rgba?\([0-9,.\s]+\)/i) ||
			str.match(/^[a-z]+/i) ||
			str.match(/^#[0-9a-f]+/i);
		let pixelMatch = str.match(/^([0-9.]+)px/i) || str.match(/^(0)/);

		if (colorMatch) {
			assert(
				!current.colorStr,
				`Multiple colors identified in text-shadow: ${textShadow}`
			);
			str = str.replace(colorMatch[0], '').trim();
			current.colorStr = colorMatch[0];
		} else if (pixelMatch) {
			assert(
				!current.pixels.length < 3,
				`Too many pixel units in text-shadow: ${textShadow}`
			);
			str = str.replace(pixelMatch[0], '').trim();
			const pixelUnit = parseFloat(
				(pixelMatch[1][0] === '.' ? '0' : '') + pixelMatch[1]
			);
			current.pixels.push(pixelUnit);
		} else if (str[0] === ',') {
			assert(current.colorStr, `Missing color in text-shadow: ${textShadow}`);
			assert(
				current.pixels.length === 3,
				`Missing pixel value in text-shadow: ${textShadow}`
			);
			current = { pixels: [] };
			shadows.push(current);
			str = str.substr(1).trim();
		} else {
			throw new Error(`Unable to process text-shadows: ${textShadow}`);
		}
	}

	return shadows.map(({ colorStr, pixels }) => ({
		colorStr,
		offsetY: pixels[0],
		offsetX: pixels[1],
		blurRadius: pixels[2]
	}));
}

function textShadowColor({ colorStr, offsetX, offsetY, blurRadius }) {
	if (offsetX > blurRadius || offsetY > blurRadius) {
		// Shadow is too far removed from the text to impact contrast
		return new Color(0, 0, 0, 0);
	}

	const shadowColor = new Color();
	shadowColor.parseString(colorStr);
	shadowColor.alpha *= blurRadiusToAlpha(blurRadius);

	return shadowColor;
}

function blurRadiusToAlpha(blurRadius) {
	// This formula is an estimate based on various tests.
	// Different people test this differently, so opinions may vary.
	return 3.7 / (blurRadius + 8);
}

export default getTextShadowColors;
