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
 * @return {Array} Array of Elements
 */
dom.elementsFromPoint = function (doc, x, y) {
	var elements = [], finalElements = [], previousPointerEvents = [], current, i, d;

	if (doc.msElementsFromPoint) {
		var nl = doc.msElementsFromPoint(x, y);
		return nl ? Array.prototype.slice.call(nl) : null;
	}

	// get all elements via elementFromPoint, and remove them from hit-testing in order
	while ((current = doc.elementFromPoint(x, y)) && elements.indexOf(current) === -1 && current !== null) {

		var style = window.getComputedStyle(current);
		if ('fixed' === style.position) {
			//reset elements, because everything before this was on top of this position:fixed element
			finalElements = [];
		} else {
			// push the element and its current style
			finalElements.push(current);
		}

		elements.push(current);

		previousPointerEvents.push({
			value: current.style.getPropertyValue('pointer-events'),
			priority: current.style.getPropertyPriority('pointer-events')
		});

		// add "pointer-events: none", to get to the underlying element
		current.style.setProperty('pointer-events', 'none', 'important');

		if ('fixed' !== style.position && dom.isOpaque(current)) { break; }
	}

	// restore the previous pointer-events values
	for (i = previousPointerEvents.length; !!(d = previousPointerEvents[--i]);) {
		elements[i].style.setProperty('pointer-events', d.value ? d.value : '', d.priority);
	}

	// return our results
	return finalElements;
};
