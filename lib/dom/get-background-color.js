/*global dom, color */
/* jshint maxstatements: 31, maxcomplexity: 12 */

/**
 * Returns the non-alpha-blended background color of a node, null if it's an image
 * @param {Element} node
 * @return {Color}
 */
var getBackgroundForSingleNode = function (node) {
	var bgColor,
		dv = node.ownerDocument.defaultView,
		nodeStyle = dv.getComputedStyle(node);

	if (node.dqColor) { return node.dqColor; }

	if (nodeStyle.getPropertyValue('background-image') !== 'none') {
		return null;
	}

	var bgColorString = nodeStyle.getPropertyValue('background-color');
	//Firefox exposes unspecified background as 'transparent' rather than rgba(0,0,0,0)
	if (bgColorString === 'transparent') {
		bgColor = new color.Color(0, 0, 0, 0);
	} else {
		bgColor = new color.Color();
		bgColor.parseRgbString(bgColorString);
	}
	var opacity = nodeStyle.getPropertyValue('opacity');
	bgColor.alpha = bgColor.alpha * opacity;

	return bgColor;
};

/**
 * Returns the non-alpha-blended background color of a node, null if it's an image
 * @param {Element} node
 * @return {Boolean}
 */
dom.isOpaque = function (node) {
	var bgColor = getBackgroundForSingleNode(node);
	if (bgColor === null || bgColor.alpha === 1) { return true; }
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
var getVisualParents = function (node, rect) {
	var visualParents,
		thisIndex,
		parents = [];

	if (dom.supportsElementsFromPoint(node.ownerDocument)) {
		visualParents = dom.elementsFromPoint(node.ownerDocument,
									Math.ceil(rect.left + 1),
									Math.ceil(rect.top + 1));
		if (visualParents && (thisIndex = visualParents.indexOf(node)) < visualParents.length - 1) {
			parents = visualParents.slice(thisIndex + 1);
		}
	} else {
		while ((node = node.parentElement) !== null) {
			parents.push(node);
		}
	}
	return parents;
};


/**
 * Returns the flattened background color of an element, or null if it can't be determined because
 * there is no opaque ancestor element visually containing it, or because background images are used.
 * @param {Element} node
 * @param {Array} bgNodes array to which all encountered nodes should be appended
 * @return {Color}
 */
dom.getBackgroundColor = function (node, bgNodes) {
	var parent, parentColor;

	if (bgNodes) { bgNodes.push(node); }
	var bgColor = getBackgroundForSingleNode(node);
	if (bgColor === null || bgColor.alpha === 1) { return bgColor; }

	node.scrollIntoView();
	var rect = node.getBoundingClientRect(),
		currentNode = node,
		colorStack = [{color: bgColor, node: node}],
		parents = getVisualParents(currentNode, rect);

	while (bgColor.alpha !== 1) {
		parent = parents.shift();
		
		//Assume white if top level is not specified
		if (!parent) {
			parentColor = new color.Color(255, 255, 255, 1);
		} else {
			if (bgNodes) { bgNodes.push(parent); }

			if (!dom.visuallyContains(node, parent)) { return null; }

			parentColor = getBackgroundForSingleNode(parent);
			if (parentColor === null) { return null; }
		}
		currentNode = parent;
		bgColor = parentColor;
		colorStack.push({color: bgColor, node: currentNode });
	}

	var currColorNode = colorStack.pop();
	var flattenedColor = currColorNode.color;
	if (currColorNode.node) { currColorNode.node.dqColor = flattenedColor; }

	while ((currColorNode = colorStack.pop()) !== undefined) {
		flattenedColor = color.flattenColors(currColorNode.color, flattenedColor);
		if (currColorNode.node) { currColorNode.node.dqColor = flattenedColor; }
	}
	return flattenedColor;
};
