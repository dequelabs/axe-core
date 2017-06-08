/* global axe, color, dom */
const graphicNodes = [
	'IMG', 'CANVAS', 'OBJECT', 'IFRAME', 'VIDEO', 'SVG'
];

function elmHasImage(elm, style) {
	var nodeName = elm.nodeName.toUpperCase();
	if (graphicNodes.includes(nodeName)) {
		axe.commons.color.incompleteData.set('bgColor', 'imgNode');
		return true;
	}

	style = style || window.getComputedStyle(elm);
	var bgImageStyle = style.getPropertyValue('background-image');
	var hasBgImage = bgImageStyle !== 'none';
	if (hasBgImage) {
		var hasGradient = /gradient/.test(bgImageStyle);
		axe.commons.color.incompleteData.set('bgColor', (hasGradient ? 'bgGradient' : 'bgImage'));
	}
	return hasBgImage;
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

function contentOverlapping(targetElement, bgNode) {
	// get content box of target element
	// check to see if the current bgNode is on top
	var targetRect = targetElement.getClientRects()[0];
	var obscuringElements = document.elementsFromPoint(targetRect.left, targetRect.top);
	if (obscuringElements) {
		for(var i = 0; i < obscuringElements.length; i++) {
			if (obscuringElements[i] !== targetElement && obscuringElements[i] === bgNode) {
				return true;
			}
		}
	}
	return false;
}

function calculateObscuringAlpha(elmIndex, elmStack, originalElm) {
	var totalAlpha = 0;

	if (elmIndex > 0) {
		// there are elements above our element, check if they contribute to the background
		for (var i = elmIndex - 1; i >= 0; i--) {
			let bgElm = elmStack[i];
			let bgElmStyle = window.getComputedStyle(bgElm);
			let bgColor = getBgColor(bgElm, bgElmStyle);
			if (bgColor.alpha && contentOverlapping(originalElm, bgElm)) {
				totalAlpha += bgColor.alpha;
			} else {
				// remove elements not contributing to the background
				elmStack.splice(i, 1);
			}
		}
	}
	return totalAlpha;
}

function elmPartiallyObscured(elm, bgElm, bgColor) {
	var obscured = (elm !== bgElm && !dom.visuallyContains(elm, bgElm) && bgColor.alpha !== 0);
	if (obscured) {
		axe.commons.color.incompleteData.set('bgColor', 'elmPartiallyObscured');
	}
	return obscured;
}

/**
 * Include nodes missing from initial gathering because
 * document.elementsFromPoint misses some elements we need
 * i.e. TR is missing from table elementStack and leaves out bgColor
 * https://github.com/dequelabs/axe-core/issues/273
 */
function includeMissingElements(elmStack, elm) {
	const elementMap = {'TD': 'TR', 'INPUT': 'LABEL'};
	const tagArray = elmStack.map((elm) => {
		return elm.tagName;
	});
	for (let candidate in elementMap) {
		if (elementMap.hasOwnProperty(candidate)) {
			// tagName matches key
			if (elm.tagName === candidate) {
				let ancestorMatch = axe.commons.dom.findUp(elm, elementMap[candidate]);
				if (ancestorMatch && elmStack.indexOf(ancestorMatch) === -1) {
					// found an ancestor not in elmStack, and it overlaps
					let overlaps = axe.commons.dom.visuallyOverlaps(elm.getBoundingClientRect(), ancestorMatch);
					if (overlaps) {
						elmStack.splice(elmStack.indexOf(elm) + 1, 0, ancestorMatch);
					}
				}
			}
			// tagName matches value
			// (such as LABEL, when matching itself. It should be in the list, but Phantom skips it)
			if (elm.tagName === elementMap[candidate] && tagArray.indexOf(elm.tagName) === -1) {
				elmStack.splice(tagArray.indexOf(candidate) + 1, 0, elm);
			}
		}
	}
}

/**
 * Look at document and body elements for relevant background information
 */
function consultDocumentBody(elmStack) {
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
	if (rect.top > window.innerHeight) {
		return;
	}
	x = Math.min(
			Math.ceil(rect.left + (rect.width / 2)),
			window.innerWidth - 1);
	y = Math.min(
			Math.ceil(rect.top + (rect.height / 2)),
			window.innerHeight - 1);

	let elmStack = document.elementsFromPoint(x, y);
	includeMissingElements(elmStack, elm);
	elmStack = dom.reduceToElementsBelowFloating(elmStack, elm);

	consultDocumentBody(elmStack);

	// Return all elements BELOW the current element, null if the element is undefined
	let elmIndex = elmStack.indexOf(elm);
	if (calculateObscuringAlpha(elmIndex, elmStack, elm) >= 0.99) {
		// if the total of the elements above our element results in total obscuring, return null
		axe.commons.color.incompleteData.set('bgColor', 'bgOverlap');
		return null;
	}
	return elmIndex !== -1 ? elmStack : null;
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

		// Get the background color
		let bgColor = getBgColor(bgElm, bgElmStyle);

		if (// abort if a node is partially obscured and obscuring element has a background
			elmPartiallyObscured(elm, bgElm, bgColor) ||
			// OR if the background elm is a graphic
			elmHasImage(bgElm, bgElmStyle)
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
			return (bgColor.alpha === 1);
		} else {
			return false;
		}
	});

	if (bgColors !== null && elmStack !== null) {
		// Mix the colors together, on top of a default white
		bgColors.push( new color.Color(255, 255, 255, 1));
		var colors = bgColors.reduce( color.flattenColors);
		return colors;
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
