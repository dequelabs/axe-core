/* global color, dom */
const graphicNodes = [
	'IMG', 'CANVAS', 'OBJECT', 'IFRAME', 'VIDEO', 'SVG'
];

function elmHasImage(elm, style) {
	var nodeName = elm.nodeName.toUpperCase();
	if (graphicNodes.includes(nodeName)) {
		return true;
	}

	style = style || window.getComputedStyle(elm);
	return style.getPropertyValue('background-image') !== 'none';
}

/**
 * Returns the non-alpha-blended background color of an element
 * @param {Element} elm
 * @return {Color}
 */
function getBgColor(elm, elmStyle) {
	elmStyle = elmStyle || window.getComputedStyle(elm);

	let bgColor = new color.Color();
	bgColor.parseRgbString( elmStyle.getPropertyValue('background-color'));

	if (bgColor.alpha !== 0) {
		let opacity = elmStyle.getPropertyValue('opacity');
		bgColor.alpha = bgColor.alpha * opacity;
	}
	return bgColor;
}

/**
 * Get all elements rendered underneath the current element, 
 * in the order in which it is rendered
 */
color.getBackgroundStack = function(elm) {
	let rect = elm.getBoundingClientRect();
	let x, y;
	if (rect.left > window.innerWidth) {
		return;
	}
	if (rect.top > window.innerWidth) {
		return;
	}
	x = Math.min(
		Math.ceil(rect.left + (rect.width / 2)),
		window.innerWidth - 1);
	y = Math.min(
			Math.ceil(rect.top + (rect.height / 2)),
			window.innerHeight - 1);

	let elmStack = document.elementsFromPoint(x, y);

	let bodyIndex = elmStack.indexOf(document.body);

	if (// Check that the body background is the page's background
		bodyIndex > 1 && // only if there are negative z-index elements
		!elmHasImage(document.documentElement) &&
		getBgColor(document.documentElement).alpha === 0
	) {
		// Remove body and html from it's current place
		elmStack.splice(bodyIndex, 1);
		elmStack.splice( elmStack.indexOf(document.documentElement), 1);

		// Put the body background as the lowest element
		elmStack.push(document.body);
	}

	// Return all elements BELOW the current element, null if the element is undefined
	let elmIndex = elmStack.indexOf(elm);
	return elmIndex !== -1 ? elmStack.slice(elmIndex) : null;
};

color.getBackgroundColor = function(elm, bgElms = [], noScroll = false) {
	if(noScroll !== true) {
		elm.scrollIntoView();
	}

	let bgColors = [];
	let elmStack = color.getBackgroundStack(elm);

	// Search the stack until we have an alpha === 1 background
	(elmStack || []).some((bgElm) => {
		let bgElmStyle = window.getComputedStyle(bgElm);
		
		if (// abort if a node is outside it's parent
			(elm !== bgElm && !dom.visuallyContains(elm, bgElm)) || 
			// OR if the background elm is a graphic
			elmHasImage(bgElm, bgElmStyle)
		) {
			bgColors = null;
			bgElms.push(bgElm);

			return true;
		}

		// Get the background color
		let bgColor = getBgColor(bgElm, bgElmStyle);
		if (bgColor.alpha !== 0) {
			// store elements contributing to the br color.
			bgElms.push(bgElm);
			bgColors.push(bgColor);

			// Exit if the background is opaque
			return (bgColor.alpha === 1);
		} else {
			return false;
		}
	});

	if (bgColors !== null && elmStack !== null) {
		// Mix the colors together, on top of a default white
		bgColors.push( new color.Color(255, 255, 255, 1));
		return bgColors.reduce( color.flattenColors);
	}

	return null;
};

/**
 * Determines whether an element has a fully opaque background, whether solid color or an image
 * @param {Element} node
 * @return {Boolean} false if the background is transparent, true otherwise
 */
dom.isOpaque = function(node) {
	let style = window.getComputedStyle(node);
	return elmHasImage(node, style) || getBgColor(node, style).alpha === 1;
};
