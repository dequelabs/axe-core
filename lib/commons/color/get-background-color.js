/*global dom, color */
/* jshint maxstatements: 40, maxcomplexity: 20 */
//TODO dsturley: too complex, needs refactor!!

var graphicNodeNames = [
	'IMG', 'CANVAS', 'OBJECT', 'IFRAME', 'VIDEO', 'SVG'
];

/**
 * Returns the non-alpha-blended background color of a node, null if it's an image
 * @param {Element} node
 * @return {Color}
 */
function getBackgroundForSingleNode(node) {
	var bgColor, bgColorString, opacity;
	var nodeStyle = window.getComputedStyle(node);
	var nodeName = node.nodeName.toUpperCase();

	if (graphicNodeNames.indexOf(nodeName) !== -1 ||
			nodeStyle.getPropertyValue('background-image') !== 'none') {
		return null;
	}

	bgColorString = nodeStyle.getPropertyValue('background-color');
	//Firefox exposes unspecified background as 'transparent' rather than rgba(0,0,0,0)
	if (bgColorString === 'transparent') {
		bgColor = new color.Color(0, 0, 0, 0);
	} else {
		bgColor = new color.Color();
		bgColor.parseRgbString(bgColorString);
	}

	opacity = nodeStyle.getPropertyValue('opacity');
	bgColor.alpha = bgColor.alpha * opacity;

	return bgColor;
}

/**
 * Determines whether an element has a fully opaque background, whether solid color or an image
 * @param {Element} node
 * @return {Boolean} false if the background is transparent, true otherwise
 */
dom.isOpaque = function(node) {
	var bgColor = getBackgroundForSingleNode(node);
	if (bgColor === null || bgColor.alpha === 1) {
		return true;
	}
	return false;
};

/**
 * Returns the elements that are visually "above" this one in z-index order where
 * supported at the position given inside the top-left corner of the provided
 * rectangle. Where not supported (IE < 10), returns the DOM parents.
 * @param {Element} node
 * @param {DOMRect} rect rectangle containing dimensions to consider
 * @return {Array} array of elements
 */
var getVisualParents = function(node, rect) {
	var visualParents, thisIndex, posVal;
	var parents = [];
	var currentNode = node;
	var nodeStyle = window.getComputedStyle(currentNode);

	visualParents = document.elementsFromPoint(
		Math.ceil(rect.left + (rect.width / 2)),
		Math.ceil(rect.top + (rect.height / 2))
	);
	thisIndex = (visualParents || []).indexOf(node);

	// if the element is not present; then something is obscuring it thus making calculation impossible
	if (thisIndex === -1) {
		return null;

	} else if (visualParents && (thisIndex < visualParents.length - 1)) {
		return visualParents.slice(thisIndex + 1);
	}

	while (currentNode !== null) {
		// If the element is positioned, we can't rely on DOM order to find visual parents
		posVal = nodeStyle.getPropertyValue('position');
		if (posVal !== 'static') {
			return null;
		}
		currentNode = currentNode.parentElement;
		if (currentNode !== null) {
			nodeStyle = window.getComputedStyle(currentNode);
			if (parseInt(nodeStyle.getPropertyValue('height'), 10) !== 0) {
				parents.push(currentNode);
			}
		}
	}

	return parents;
};


/**
 * Returns the flattened background color of an element, or null if it can't be determined because
 * there is no opaque ancestor element visually containing it, or because background images are used.
 * @param {Element} node
 * @param {Array} bgNodes array to which all encountered nodes should be appended
 * @param {Boolean} noScroll (default false)
 * @return {Color}
 */
//TODO dsturley; why is this passing `bgNodes`?
color.getBackgroundColor = function(node, bgNodes, noScroll) {
	var parent, parentColor;
	var bgColor = getBackgroundForSingleNode(node);

	if (bgNodes && (bgColor === null || bgColor.alpha !== 0)) {
		bgNodes.push(node);
	}
	if (bgColor === null || bgColor.alpha === 1) {
		return bgColor;
	}

	if(noScroll !== true) {
		node.scrollIntoView();
	}

	var rect = node.getBoundingClientRect();
	var currentNode = node;
	var colorStack = [{
			color: bgColor,
			node: node
		}];
	var parents = getVisualParents(currentNode, rect);

	if (!parents) {
		return null;
	}

	var backgroundColor;
	var white = new color.Color(255, 255, 255, 1);
	var transparent = new color.Color(0, 0, 0, 0);

	while (bgColor.alpha !== 1) {
		parent = parents.shift();

		if (!currentNode) {
			parentColor = white;

		// return the background color
		} else if (!parent && currentNode.nodeName.toUpperCase() === 'HTML') {
			parentColor = backgroundColor || getBackgroundForSingleNode(currentNode);

		} else {
			if (!dom.visuallyContains(node, parent)) {
				return null;
			}

			parentColor = getBackgroundForSingleNode(parent);

			if (parent.nodeName.toUpperCase() === 'BODY' && parentColor.alpha !== 0) {
				backgroundColor = getBackgroundForSingleNode(parent);
				parentColor = transparent;
			}

			if (bgNodes && (parentColor === null || parentColor.alpha !== 0)) {
				bgNodes.push(parent);
			}
			if (parentColor === null) {
				return null;
			}
		}
		currentNode = parent;
		bgColor = parentColor;

		colorStack.push({
			color: bgColor,
			node: currentNode
		});
	}

	var currColorNode = colorStack.pop();
	var flattenedColor = currColorNode.color;

	while ((currColorNode = colorStack.pop()) !== undefined) {
		flattenedColor = color.flattenColors(currColorNode.color, flattenedColor);
	}

	return flattenedColor;
};
