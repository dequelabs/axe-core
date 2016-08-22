/* global dom */

/**
 * Reduce an array of elements to only those that are below a 'floating' element.
 *
 * @param {Array} elements
 * @param {Element} targetNode
 * @returns {Array}
 */
dom.reduceToElementsBelowFloating = function (elements, targetNode) {
	var floatingPositions = ['fixed', 'sticky'],
		finalElements = [],
		targetFound = false,
		index,
		currentNode,
		style;

	// Filter out elements that are temporarily floating above the target
	for (index = 0; index < elements.length; ++index) {
		currentNode = elements[index];
		if (currentNode === targetNode) {
			targetFound = true;
		}

		style = window.getComputedStyle(currentNode);

		if (!targetFound && floatingPositions.indexOf(style.position) !== -1) {
			//Target was not found yet, so it must be under this floating thing (and will not always be under it)
			finalElements = [];
			continue;
		}

		finalElements.push(currentNode);
	}

	return finalElements;
};

/**
 * Reduce an array of elements to only those before the first opaque
 *
 * @param {Array} elements array of elements to reduce
 * @returns {Array}
 */
dom.reduceToFirstOpaque = function (elements) {
	var finalElements = [],
		currentNode,
		index;

	for (index = 0; index < elements.length; ++index) {
		currentNode = elements[index];

		finalElements.push(currentNode);

		if (dom.isOpaque(currentNode)) {
			break;
		}
	}

	return finalElements;
};
