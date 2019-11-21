import getBackgroundStack from './get-background-stack';
import getOwnBackgroundColor from './get-own-background-color';
import incompleteData from './incomplete-data';
import elementHasImage from './element-has-image';
import Color from './color';
import flattenColors from './flatten-colors';
import visuallyContains from '../dom/visually-contains';

/**
 * Determine if element is partially overlapped, triggering a Can't Tell result
 * @private
 * @param {Element} elm
 * @param {Element} bgElm
 * @param {Object} bgColor
 * @return {Boolean}
 */
function elmPartiallyObscured(elm, bgElm, bgColor) {
	var obscured =
		elm !== bgElm && !visuallyContains(elm, bgElm) && bgColor.alpha !== 0;
	if (obscured) {
		incompleteData.set('bgColor', 'elmPartiallyObscured');
	}
	return obscured;
}

/**
 * Return the scrolling parent element
 * @see https://stackoverflow.com/questions/35939886/find-first-scrollable-parent#42543908
 * @param {Element} element
 * @param {Boolean} includeHidden
 * @return {Element}
 */
function getScrollParent(element, includeHidden) {
	var style = getComputedStyle(element);
	var excludeStaticParent = style.position === 'absolute';
	var overflowRegex = includeHidden ? /(auto|scroll|hidden)/ : /(auto|scroll)/;

	if (style.position === 'fixed') {
		return document.documentElement;
	}
	for (var parent = element; (parent = parent.parentElement); ) {
		style = getComputedStyle(parent);
		if (excludeStaticParent && style.position === 'static') {
			continue;
		}
		if (
			overflowRegex.test(style.overflow + style.overflowY + style.overflowX)
		) {
			return parent;
		}
	}

	return document.documentElement;
}

/**
 * Returns background color for element
 * Uses getBackgroundStack() to get all elements rendered underneath the current element,
 * to help determine the composite background color.
 *
 * @method getBackgroundColor
 * @memberof axe.commons.color
 * @param	{Element} elm Element to determine background color
 * @param	{Array}	 [bgElms=[]] elements to inspect
 * @param	{Boolean} [noScroll=false] should scroll
 * @returns {Color}
 */
function getBackgroundColor(elm, bgElms = [], noScroll = false) {
	if (noScroll !== true) {
		/**
		 * Avoid scrolling overflow:hidden containers, by only aligning to top,
		 * when not doing so would move the center point above the viewport top.
		 */
		const clientHeight = elm.getBoundingClientRect().height;
		const alignToTop = clientHeight - 2 >= window.innerHeight * 2;
		elm.scrollIntoView(alignToTop);

		// ensure element is scrolled into view horizontally
		let center, scrollParent;
		do {
			const rect = elm.getBoundingClientRect();

			// 'x' does not exist in IE11
			const x = 'x' in rect ? rect.x : rect.left;
			center = x + rect.width / 2;

			if (center < 0) {
				scrollParent = getScrollParent(elm);
				scrollParent.scrollLeft = 0;
			}
		} while (center < 0 && scrollParent !== document.documentElement);
	}

	let bgColors = [];
	let elmStack = getBackgroundStack(elm);

	// Search the stack until we have an alpha === 1 background
	(elmStack || []).some(bgElm => {
		const bgElmStyle = window.getComputedStyle(bgElm);

		// Get the background color
		let bgColor = getOwnBackgroundColor(bgElmStyle);

		if (
			// abort if a node is partially obscured and obscuring element has a background
			elmPartiallyObscured(elm, bgElm, bgColor) ||
			// OR if the background elm is a graphic
			elementHasImage(bgElm, bgElmStyle)
		) {
			bgColors = null;
			bgElms.push(bgElm);

			return true;
		}

		if (bgColor.alpha !== 0) {
			// store elements contributing to the br color.
			bgElms.push(bgElm);
			bgColors.push(bgColor);

			// Exit if the background is opaque
			return bgColor.alpha === 1;
		} else {
			return false;
		}
	});

	if (bgColors !== null && elmStack !== null) {
		// Mix the colors together, on top of a default white
		bgColors.push(new Color(255, 255, 255, 1));
		var colors = bgColors.reduce(flattenColors);
		return colors;
	}

	return null;
}

export default getBackgroundColor;
