/*global dom, color */
/* jslint maxstatements: 29 */

/**
 * Returns the flattened background color of an element, or null if it can't be determined because
 * there is no opaque ancestor element visually containing it, or because background images are used.
 * @param {Element} node
 * @return {Color}
 */
dom.getBackgroundColor = function (node) {
	var dv = node.ownerDocument.defaultView,
		nodeStyle = dv.getComputedStyle(node),
		bgColor, parent, visualParents, thisIndex;
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
	if (bgColor.alpha === 1) { return bgColor; }

	node.scrollIntoView();
	var rect = node.getBoundingClientRect();

	if (dom.supportsElementsFromPoint(node.ownerDocument)) {
		visualParents = dom.elementsFromPoint(node.ownerDocument,
									Math.ceil(rect.left + 1),
									Math.ceil(rect.top + 1));
		if (visualParents && (thisIndex = visualParents.indexOf(node)) < visualParents.length - 1) {
			parent = visualParents[thisIndex + 1];
		} else {
			parent = null;
		}
	} else {
		parent = node.parentNode;
	}
	//Assume white if top level is not specified
	if (parent === null || parent.nodeType === 9) { return new color.Color(255, 255, 255, 1); }
	if (!dom.visuallyContains(node, parent)) { return null; }

	var parentColor = dom.getBackgroundColor(parent);
	if (parentColor === null) { return null; }

	return color.flattenColors(bgColor, parentColor);
};
