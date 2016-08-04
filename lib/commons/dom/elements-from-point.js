/* global dom */

/**
 * Returns true if the browser supports one of the methods to get elements from point
 * @param {Document} doc The HTML document
 * @return {Boolean}
 */
dom.supportsElementsFromPoint = function (doc) {
	var element = doc.createElement('x');
	element.style.cssText = 'pointer-events:auto';
	return element.style.pointerEvents === 'auto' || !!doc.msElementsFromPoint;
};


/**
 * Returns the elements at a particular point in the viewport, in z-index order
 * @param {Document} doc The HTML document
 * @param {Element} x The x coordinate, as an integer
 * @param {Element} y The y coordinate, as an integer
 * @param {Element} targetNode An element that you are targeting. Used to detect if the element is temporarily obscured by another element
 * @return {Array} Array of Elements
 */
dom.elementsFromPoint = function (doc, x, y, targetNode) {
	var elements = [], finalElements = [], previousPointerEvents = [], current, i, d, targetFound = false, floatingPositions = ['fixed', 'sticky'], style, currentNode, index;

	targetNode = targetNode || false;

	if (doc.msElementsFromPoint) {
		var nl = doc.msElementsFromPoint(x, y);
		return nl ? Array.prototype.slice.call(nl) : null;
	}

	// get all elements via elementFromPoint, and remove them from hit-testing in order
	while ((current = doc.elementFromPoint(x, y)) && elements.indexOf(current) === -1 && current !== null) {
		elements.push(current);

		previousPointerEvents.push({
			value: current.style.getPropertyValue('pointer-events'),
			priority: current.style.getPropertyPriority('pointer-events')
		});

		// add "pointer-events: none", to get to the underlying element
		current.style.setProperty('pointer-events', 'none', 'important');
	}

	// restore the previous pointer-events values
	for (i = previousPointerEvents.length; !!(d = previousPointerEvents[--i]);) {
		elements[i].style.setProperty('pointer-events', d.value ? d.value : '', d.priority);
	}

	// Filter out elements that are temporarily floating above the target
	for (var index = 0; index < elements.length; ++index) {
		currentNode = elements[index];
		if (currentNode == targetNode) {
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

	elements = finalElements;
	finalElements = [];
	
	//Now only return elements to the first opaque
	for (index = 0; index < elements.length; ++index) {
		currentNode = elements[index];

		finalElements.push(currentNode);

		if (dom.isOpaque(currentNode)) {
			break;
		}
	}

	// return our results
	return finalElements;
};
