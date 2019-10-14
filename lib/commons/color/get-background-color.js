/* global axe, color, dom */

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
color.getBackgroundColor = function getBackgroundColor(
	elm,
	bgElms = [],
	noScroll = false
) {
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
	let elmStack = color.getBackgroundStack(elm);

	// Search the stack until we have an alpha === 1 background
	(elmStack || []).some(bgElm => {
		const bgElmStyle = window.getComputedStyle(bgElm);

		// Get the background color
		let bgColor = color.getOwnBackgroundColor(bgElmStyle);

		if (
			// abort if a node is partially obscured and obscuring element has a background
			elmPartiallyObscured(elm, bgElm, bgColor) ||
			// OR if the background elm is a graphic
			color.elementHasImage(bgElm, bgElmStyle)
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
		bgColors.push(new color.Color(255, 255, 255, 1));
		var colors = bgColors.reduce(color.flattenColors);
		return colors;
	}

	return null;
};

/**
 * Get all elements rendered underneath the current element,
 * In the order they are displayed (front to back)
 *
 * @method getBackgroundStack
 * @memberof axe.commons.color
 * @param {Element} elm
 * @return {Array}
 */
color.getBackgroundStack = function getBackgroundStack(elm) {
	let elmStack = color.filteredRectStack(elm);

	if (elmStack === null) {
		return null;
	}
	elmStack = includeMissingElements(elmStack, elm);
	elmStack = dom.reduceToElementsBelowFloating(elmStack, elm);
	elmStack = sortPageBackground(elmStack);

	// Return all elements BELOW the current element, null if the element is undefined
	let elmIndex = elmStack.indexOf(elm);
	if (calculateObscuringElement(elmIndex, elmStack, elm)) {
		// if the total of the elements above our element results in total obscuring, return null
		axe.commons.color.incompleteData.set('bgColor', 'bgOverlap');
		return null;
	}
	return elmIndex !== -1 ? elmStack : null;
};

/**
 * Get filtered stack of block and inline elements, excluding line breaks
 * @method filteredRectStack
 * @memberof axe.commons.color
 * @param {Element} elm
 * @return {Array}
 */
color.filteredRectStack = function filteredRectStack(elm) {
	const rectStack = color.getRectStack(elm);

	if (rectStack && rectStack.length === 1) {
		return rectStack[0];
	}

	if (rectStack && rectStack.length > 1) {
		const boundingStack = rectStack.shift();
		let isSame;

		// Safari v12.1 does not include labels as part of elementsFromPoint()
		// if they wrap an input element (UNLESS the label has a background
		// color). this results in two different rectStacks (since
		// elm.getClientRects() returns two rects for the element) which
		// returns null as isSame is false. we can fix this by adding in the
		// missing label to the boundingStack before checking for isSame
		// @see https://bugs.webkit.org/show_bug.cgi?id=197743
		includeMissingElements(boundingStack, elm);

		// iterating over arrays of DOMRects
		rectStack.forEach((rectList, index) => {
			if (index === 0) {
				return;
			}
			// if the stacks are the same, use the first one. otherwise, return null.
			let rectA = rectStack[index - 1],
				rectB = rectStack[index];

			// if elements in clientRects are the same
			// or the boundingClientRect contains the differing element, pass it
			isSame =
				rectA.every(
					(element, elementIndex) => element === rectB[elementIndex]
				) || boundingStack.includes(elm);
		});
		if (!isSame) {
			axe.commons.color.incompleteData.set('bgColor', 'elmPartiallyObscuring');
			return null;
		}
		// pass the first stack if it wasn't partially covered
		return rectStack[0];
	}

	// rect outside of viewport
	axe.commons.color.incompleteData.set('bgColor', 'outsideViewport');
	return null;
};

/**
 * Get relevant stacks of block and inline elements, excluding line breaks
 * @method getRectStack
 * @memberof axe.commons.color
 * @param {Element} elm
 * @return {Array}
 */
color.getRectStack = function(elm) {
	const boundingCoords = axe.commons.color.centerPointOfRect(
		elm.getBoundingClientRect()
	);

	if (!boundingCoords) {
		return null;
	}

	let boundingStack = dom.shadowElementsFromPoint(
		boundingCoords.x,
		boundingCoords.y
	);

	let rects = Array.from(elm.getClientRects());
	// If the element does not have multiple rects, like for display:block, return a single stack
	if (!rects || rects.length <= 1) {
		return [boundingStack];
	}

	// Handle inline elements spanning multiple lines to be evaluated
	let filteredArr = rects
		.filter(rect => {
			// exclude manual line breaks in Chrome/Safari
			return rect.width && rect.width > 0;
		})
		.map(rect => {
			const coords = axe.commons.color.centerPointOfRect(rect);
			if (coords) {
				return dom.shadowElementsFromPoint(coords.x, coords.y);
			}
		});

	if (filteredArr.some(stack => stack === undefined)) {
		// Can be happen when one or more of the rects sits outside the viewport
		return null;
	}

	// add bounding client rect stack for comparison later
	filteredArr.splice(0, 0, boundingStack);
	return filteredArr;
};

/**
 * Look at document and body elements for relevant background information
 * @method sortPageBackground
 * @private
 * @param {Array} elmStack
 * @returns {Array}
 */
function sortPageBackground(elmStack) {
	let bodyIndex = elmStack.indexOf(document.body);
	let bgNodes = elmStack;

	// Body can sometimes appear out of order in the stack:
	//   1) Body is not the first element due to negative z-index elements
	//   2) Elements are positioned outside of body's rect coordinates
	//      (see https://github.com/dequelabs/axe-core/issues/1456)
	// In those instances we want to reinsert body back into the element stack
	// when not using the root document element as the html canvas for bgcolor
	// prettier-ignore
	let sortBodyElement =
		bodyIndex > 1 || // negative z-index elements
		bodyIndex === -1; // element does not intersect with body

	if (
		sortBodyElement &&
		!color.elementHasImage(document.documentElement) &&
		color.getOwnBackgroundColor(
			window.getComputedStyle(document.documentElement)
		).alpha === 0
	) {
		// Only remove document.body if it was originally contained within the element stack
		if (bodyIndex > 1) {
			bgNodes.splice(bodyIndex, 1);
		}
		// Remove document element since body will be used for bgcolor
		bgNodes.splice(elmStack.indexOf(document.documentElement), 1);

		// Put the body background as the lowest element
		bgNodes.push(document.body);
	}
	return bgNodes;
}

/**
 * Include nodes missing from initial gathering because
 * document.elementsFromPoint misses some elements we need
 * i.e. TR is missing from table elementStack and leaves out bgColor
 * https://github.com/dequelabs/axe-core/issues/273
 * @private
 * @param {Array} elmStack
 * @param {Element} elm
 * @returns {Array}
 */
function includeMissingElements(elmStack, elm) {
	/*eslint max-depth:["error",7]*/
	const nodeName = elm.nodeName.toUpperCase();
	const elementMap = {
		TD: ['TR', 'THEAD', 'TBODY', 'TFOOT'],
		TH: ['TR', 'THEAD', 'TBODY', 'TFOOT'],
		INPUT: ['LABEL']
	};
	const tagArray = elmStack.map(elm => {
		return elm.nodeName.toUpperCase();
	});
	let bgNodes = elmStack;
	for (let candidate in elementMap) {
		// check that TR or LABEL has paired nodeName from elementMap, but don't expect elm to be that candidate
		if (tagArray.includes(candidate)) {
			for (
				let candidateIndex = 0;
				candidateIndex < elementMap[candidate].length;
				candidateIndex++
			) {
				// look up the tree for a matching candidate
				let ancestorMatch = axe.commons.dom.findUp(
					elm,
					elementMap[candidate][candidateIndex]
				);
				if (ancestorMatch && elmStack.indexOf(ancestorMatch) === -1) {
					// found an ancestor not in elmStack, and it overlaps
					let overlaps = axe.commons.dom.visuallyOverlaps(
						elm.getBoundingClientRect(),
						ancestorMatch
					);
					if (overlaps) {
						// if target is in the elementMap, use its position.
						bgNodes.splice(tagArray.indexOf(candidate) + 1, 0, ancestorMatch);
					}
				}
				// nodeName matches value
				// (such as LABEL, when matching itself. It should be in the list, but Phantom skips it)
				if (
					nodeName === elementMap[candidate][candidateIndex] &&
					tagArray.indexOf(nodeName) === -1
				) {
					bgNodes.splice(tagArray.indexOf(candidate) + 1, 0, elm);
				}
			}
		}
	}
	return bgNodes;
}

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
		elm !== bgElm && !dom.visuallyContains(elm, bgElm) && bgColor.alpha !== 0;
	if (obscured) {
		axe.commons.color.incompleteData.set('bgColor', 'elmPartiallyObscured');
	}
	return obscured;
}

/**
 * Calculate alpha transparency of a background element obscuring the current node
 * @private
 * @param {Number} elmIndex
 * @param {Array} elmStack
 * @param {Element} originalElm
 * @return {Number|undefined}
 */
function calculateObscuringElement(elmIndex, elmStack, originalElm) {
	if (elmIndex > 0) {
		// there are elements above our element, check if they contribute to the background
		for (var i = elmIndex - 1; i >= 0; i--) {
			let bgElm = elmStack[i];
			if (contentOverlapping(originalElm, bgElm)) {
				return true;
			} else {
				// remove elements not contributing to the background
				elmStack.splice(i, 1);
			}
		}
	}

	return false;
}

/**
 * Determines overlap of node's content with a bgNode. Used for inline elements
 * @private
 * @param {Element} targetElement
 * @param {Element} bgNode
 * @return {Boolean}
 */
function contentOverlapping(targetElement, bgNode) {
	// get content box of target element
	// check to see if the current bgNode is overlapping
	var targetRect = targetElement.getClientRects()[0];
	var obscuringElements = dom.shadowElementsFromPoint(
		targetRect.left,
		targetRect.top
	);
	if (obscuringElements) {
		for (var i = 0; i < obscuringElements.length; i++) {
			if (
				obscuringElements[i] !== targetElement &&
				obscuringElements[i] === bgNode
			) {
				return true;
			}
		}
	}
	return false;
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
 * Determines whether an element has a fully opaque background, whether solid color or an image
 * @param {Element} node
 * @return {Boolean} false if the background is transparent, true otherwise
 */
dom.isOpaque = function(node) {
	const style = window.getComputedStyle(node);
	return (
		color.elementHasImage(node, style) ||
		color.getOwnBackgroundColor(style).alpha === 1
	);
};
