/* global axe, color, dom */
const graphicNodes = [
	'IMG', 'CANVAS', 'OBJECT', 'IFRAME', 'VIDEO', 'SVG'
];

/**
 * Reports if an element has a background image or gradient
 * @private
 * @param {Element} node
 * @param {Object|null} style
 * @return {Boolean}
 */
function elmHasImage(node, style) {
	var nodeName = node.nodeName.toUpperCase();
	if (graphicNodes.includes(nodeName)) {
		axe.commons.color.incompleteData.set('bgColor', 'imgNode');
		return true;
	}

	style = style || window.getComputedStyle(node);
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
 * @private
 * @param {Element} node
 * @return {Color}
 */
function getBgColor(node, elmStyle) {
	elmStyle = elmStyle || window.getComputedStyle(node);

	let bgColor = new color.Color();
	bgColor.parseRgbString( elmStyle.getPropertyValue('background-color'));

	if (bgColor.alpha !== 0) {
		let opacity = elmStyle.getPropertyValue('opacity');
		bgColor.alpha = bgColor.alpha * opacity;
	}
	return bgColor;
}

/**
 * Determines overlap of node's content with a bgNode. Used for inline elements
 * @private
 * @param {Element} targetElement
 * @param {Element} bgNode
 * @return {Boolean}
 */
function contentOverlapping(targetElement, fgNode) {
	// get content box of target element
	// check to see if the current fgNode is overlapping
	var targetRect = targetElement.getBoundingClientRect();
	var fgNodeRect = fgNode.getBoundingClientRect();
	var overlappingNodes = !(targetRect.right < fgNodeRect.left ||
		targetRect.left > fgNodeRect.right ||
		targetRect.bottom < fgNodeRect.top ||
		targetRect.top > fgNodeRect.bottom);
	if (overlappingNodes) {
		return true;
	}
	return false;
}
/**
 * Calculate alpha transparency of a background element obscuring the current node
 * @private
 * @param {Number} elmIndex
 * @param {Array} elmStack
 * @param {Element} originalElm
 * @return {Number|undefined}
 */
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
/**
 * Determine if element is partially overlapped, triggering a Can't Tell result
 * @private
 * @param {Element} node
 * @param {Element} bgElm
 * @param {Object} bgColor
 * @return {Boolean}
 */
function elmPartiallyObscured(node, bgElm, bgColor) {
	var obscured = (node !== bgElm && !dom.visuallyContains(node, bgElm) && bgColor.alpha !== 0);
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
 *
 * @private
 * @param {Array} elmStack
 * @param {Element} node
 */
function includeMissingElements(elmStack, node) {
	const elementMap = {'TD': 'TR', 'INPUT': 'LABEL'};
	const tagArray = elmStack.map((node) => {
		return node.tagName;
	});
	let bgNodes = elmStack;
	for (let candidate in elementMap) {
		if (elementMap.hasOwnProperty(candidate)) {
			// tagName matches key
			if (node.tagName === candidate) {
				let ancestorMatch = axe.commons.dom.findUp(node, elementMap[candidate]);
				if (ancestorMatch && elmStack.indexOf(ancestorMatch) === -1) {
					// found an ancestor not in elmStack, and it overlaps
					let overlaps = axe.commons.dom.visuallyOverlaps(node.getBoundingClientRect(), ancestorMatch);
					if (overlaps) {
						bgNodes.splice(elmStack.indexOf(node) + 1, 0, ancestorMatch);
					}
				}
			}
			// tagName matches value
			// (such as LABEL, when matching itself. It should be in the list, but Phantom skips it)
			if (node.tagName === elementMap[candidate] && tagArray.indexOf(node.tagName) === -1) {
				bgNodes.splice(tagArray.indexOf(candidate) + 1, 0, node);
			}
		}
	}
	return bgNodes;
}

/**
 * Look at document and body elements for relevant background information
 * @private
 * @param {Array} elmStack
 */
function sortPageBackground(elmStack) {
	let bodyIndex = elmStack.indexOf(document.body);

	let bgNodes = elmStack;

	if (// Check that the body background is the page's background
		bodyIndex > 1 && // only if there are negative z-index elements
		!elmHasImage(document.documentElement) &&
		getBgColor(document.documentElement).alpha === 0
	) {
		// Remove body and html from it's current place
		bgNodes.splice(bodyIndex, 1);
		bgNodes.splice( elmStack.indexOf(document.documentElement), 1);

		// Put the body background as the lowest element
		bgNodes.push(document.body);
	}
	return bgNodes;
}

/**
 * Get all elements rendered underneath the current element,
 * in the order in which it is rendered
 */
color.getBackgroundStack = function(node) {
	let rect = node.getBoundingClientRect();
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
	elmStack = includeMissingElements(elmStack, node);
	elmStack = dom.reduceToElementsBelowFloating(elmStack, node);
	elmStack = sortPageBackground(elmStack);

	// Return all elements BELOW the current element, null if the element is undefined
	let elmIndex = elmStack.indexOf(node);
	if (calculateObscuringAlpha(elmIndex, elmStack, node) >= 0.99) {
		// if the total of the elements above our element results in total obscuring, return null
		axe.commons.color.incompleteData.set('bgColor', 'bgOverlap');
		return null;
	}
	return elmIndex !== -1 ? elmStack : null;
};

color.getBackgroundColor = function(node, bgElms = [], noScroll = false) {
	if(noScroll !== true) {
		node.scrollIntoView();
	}
	let bgColors = [];
	let elmStack = color.getBackgroundStack(node);
	// Search the stack until we have an alpha === 1 background
	(elmStack || []).some((bgElm) => {
		let bgElmStyle = window.getComputedStyle(bgElm);

		// Get the background color
		let bgColor = getBgColor(bgElm, bgElmStyle);

		if (// abort if a node is partially obscured and obscuring element has a background
			elmPartiallyObscured(node, bgElm, bgColor) ||
			// OR if the background node is a graphic
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
