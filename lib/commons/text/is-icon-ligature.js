/* global text */

// keep track of each font encountered and the number of times it shows up
// as a ligature.
const fonts = {};

/**
 * Determines if a given text node is an icon ligature
 *
 * @method isIconLigature
 * @memberof axe.commons.text
 * @instance
 * @param {VirtualNode} textVNode The virtual text node
 * @param {Number} occuranceThreshold Number of times the font is encountered before auto-assigning the font as a ligature or not
 * @param {Number} pixelThreshold Percent of differences in pixel data needed to determine if a font is a ligature font
 * @return {Boolean}
 */
text.isIconLigature = function(
	textVNode,
	occuranceThreshold = 3,
	pixelThreshold = 0.1
) {
	/**
	 * Determine if the visible text is a ligature by comparing the
	 * first letters image data to the entire strings image data.
	 * If the two images are significantly different (typical set to 5%
	 * statistical significance, but we'll be using a slightly higher value
	 * of 10% to help keep the size of the canvas down) then we know the text
	 * has been replaced by a ligature.
	 *
	 * Example:
	 * If a text node was the string "File", looking at just the first
	 * letter "F" would produce the following image:
	 *
	 * ┌─┬─┬─┬─┬─┬─┬─┬─┬─┬─┬─┬─┬─┬─┬─┐
	 * │ │ │█│█│█│█│█│█│█│█│█│█│█│ │ │
	 * ├─┼─┼─┼─┼─┼─┼─┼─┼─┼─┼─┼─┼─┼─┼─┤
	 * │ │ │█│█│█│█│█│█│█│█│█│█│█│ │ │
	 * ├─┼─┼─┼─┼─┼─┼─┼─┼─┼─┼─┼─┼─┼─┼─┤
	 * │ │ │█│█│ │ │ │ │ │ │ │ │ │ │ │
	 * ├─┼─┼─┼─┼─┼─┼─┼─┼─┼─┼─┼─┼─┼─┼─┤
	 * │ │ │█│█│ │ │ │ │ │ │ │ │ │ │ │
	 * ├─┼─┼─┼─┼─┼─┼─┼─┼─┼─┼─┼─┼─┼─┼─┤
	 * │ │ │█│█│█│█│█│█│█│ │ │ │ │ │ │
	 * ├─┼─┼─┼─┼─┼─┼─┼─┼─┼─┼─┼─┼─┼─┼─┤
	 * │ │ │█│█│█│█│█│█│█│ │ │ │ │ │ │
	 * ├─┼─┼─┼─┼─┼─┼─┼─┼─┼─┼─┼─┼─┼─┼─┤
	 * │ │ │█│█│ │ │ │ │ │ │ │ │ │ │ │
	 * ├─┼─┼─┼─┼─┼─┼─┼─┼─┼─┼─┼─┼─┼─┼─┤
	 * │ │ │█│█│ │ │ │ │ │ │ │ │ │ │ │
	 * ├─┼─┼─┼─┼─┼─┼─┼─┼─┼─┼─┼─┼─┼─┼─┤
	 * │ │ │█│█│ │ │ │ │ │ │ │ │ │ │ │
	 * └─┴─┴─┴─┴─┴─┴─┴─┴─┴─┴─┴─┴─┴─┴─┘
	 *
	 * But if the entire string "File" produced an image which had at least
	 * a 10% difference in pixels, we would know that the string was replaced
	 * by a ligature:
	 *
	 * ┌─┬─┬─┬─┬─┬─┬─┬─┬─┬─┬─┬─┬─┬─┬─┐
	 * │ │█│█│█│█│█│█│█│█│█│█│ │ │ │ │
	 * ├─┼─┼─┼─┼─┼─┼─┼─┼─┼─┼─┼─┼─┼─┼─┤
	 * │ │█│ │ │ │ │ │ │ │ │█│█│ │ │ │
	 * ├─┼─┼─┼─┼─┼─┼─┼─┼─┼─┼─┼─┼─┼─┼─┤
	 * │ │█│ │█│█│█│█│█│█│ │█│ │█│ │ │
	 * ├─┼─┼─┼─┼─┼─┼─┼─┼─┼─┼─┼─┼─┼─┼─┤
	 * │ │█│ │ │ │ │ │ │ │ │█│█│█│█│ │
	 * ├─┼─┼─┼─┼─┼─┼─┼─┼─┼─┼─┼─┼─┼─┼─┤
	 * │ │█│ │█│█│█│█│█│█│ │ │ │ │█│ │
	 * ├─┼─┼─┼─┼─┼─┼─┼─┼─┼─┼─┼─┼─┼─┼─┤
	 * │ │█│ │ │ │ │ │ │ │ │ │ │ │█│ │
	 * ├─┼─┼─┼─┼─┼─┼─┼─┼─┼─┼─┼─┼─┼─┼─┤
	 * │ │█│ │█│█│█│█│█│█│█│█│█│ │█│ │
	 * ├─┼─┼─┼─┼─┼─┼─┼─┼─┼─┼─┼─┼─┼─┼─┤
	 * │ │█│ │ │ │ │ │ │ │ │ │ │ │█│ │
	 * ├─┼─┼─┼─┼─┼─┼─┼─┼─┼─┼─┼─┼─┼─┼─┤
	 * │ │█│█│█│█│█│█│█│█│█│█│█│█│█│ │
	 * └─┴─┴─┴─┴─┴─┴─┴─┴─┴─┴─┴─┴─┴─┴─┘
	 */
	if (!axe._cache.get('context')) {
		const context = document.createElement('canvas').getContext('2d');
		axe._cache.set('context', context);
	}
	const context = axe._cache.get('context');
	const canvas = context.canvas;

	const style = window.getComputedStyle(textVNode.parent.actualNode);
	const fontFamily = style.getPropertyValue('font-family');

	if (!fonts[fontFamily]) {
		fonts[fontFamily] = {
			occurances: 0,
			numLigatures: 0
		};
	}
	const font = fonts[fontFamily];

	// improve the performance by only comparing the image data of a font
	// a certain number of times
	if (font.occurances >= occuranceThreshold) {
		// if the font has always been a ligature assume it's a ligature font
		if (font.numLigatures / font.occurances === 1) {
			return true;
		}
		// inversely, if it's never been a ligature assume it's not a ligature font
		else if (font.numLigatures === 0) {
			return false;
		}

		// we could theoretically get into an odd middle ground scenario in which
		// the font family is being used as normal text sometimes and as icons
		// other times. in these cases we would need to always check the text
		// to know if it's an icon or not
	}
	font.occurances++;

	// 30px was chosen to account for common ligatures in normal fonts
	// such as fi, ff, ffi. If a ligature would add a single column of
	// pixels to a 30x30 grid, it would not meet the statistical significance
	// threshold of 10% (30x30 = 900; 30/900 = 3.333%). this also allows for
	// more than 1 column differences (60/900 = 6.666%) and things like
	// extending the top of the f in the fi ligature.
	let fontStyle = `30px ${fontFamily}`;
	const nodeValue = textVNode.actualNode.nodeValue;

	// set the size of the canvas to the width of the first letter
	context.font = fontStyle;
	const firstChar = nodeValue.charAt(0);
	let width = context.measureText(firstChar).width;

	// ensure font meets the 30px width requirement (30px font-size doesn't
	// necessarily mean its 30px wide when drawn)
	if (width < 30) {
		const diff = 30 / width;
		width *= diff;
		fontStyle = `${30 * diff}px ${fontFamily}`;
	}
	canvas.width = canvas.height = width;

	// changing the dimensions of a canvas resets all properties (include font)
	// and clears it
	context.font = fontStyle;
	context.fillText(firstChar, 0, width / 2);
	const compareData = context.getImageData(0, 0, width, width).data;

	context.clearRect(0, 0, width, width);
	context.fillText(nodeValue, 0, width / 2);
	const compareWith = context.getImageData(0, 0, width, width).data;

	// calculate the number of differences between the first letter and the
	// entire string
	let differences = 0;
	let size = compareWith.length / 4;
	for (let i = 0; i < compareWith.length; i += 4) {
		for (let j = 0; j < 4; j++) {
			if (compareWith[i + j] !== compareData[i + j]) {
				differences++;
				break;
			}
		}
	}

	if (differences / size > pixelThreshold) {
		font.numLigatures++;
		return true;
	}

	return false;
};
