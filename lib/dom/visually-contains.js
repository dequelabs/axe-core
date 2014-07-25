/* global dom */

/**
 * Checks whether a parent element visually contains its child, either directly or via scrolling.
 * Assumes that |parent| is an ancestor of |node|.
 * @param {Element} node
 * @param {Element} parent
 * @return {boolean} True if node is visually contained within parent
 */
dom.visuallyContains = function (node, parent) {
	var rect = node.getBoundingClientRect();
	var parentRect = parent.getBoundingClientRect();
	var parentTop = parentRect.top;
	var parentLeft = parentRect.left;
	var parentScrollArea = {
		top: parentTop - parent.scrollTop,
		bottom: parentTop - parent.scrollTop + parent.scrollHeight,
		left: parentLeft - parent.scrollLeft,
		right: parentLeft - parent.scrollLeft + parent.scrollWidth
	};

	if (rect.left < parentScrollArea.left || rect.top < parentScrollArea.top ||
		rect.right > parentScrollArea.right || rect.bottom > parentScrollArea.bottom) {
		return false;
	}

	var defaultView = node.ownerDocument.defaultView;
	var style = defaultView.getComputedStyle(parent);

	if (rect.right > parentRect.right || rect.bottom > parentRect.bottom) {
		return (style.overflow === 'scroll' || style.overflow === 'auto' ||
				style.overflow === 'hidden' || parent instanceof defaultView.HTMLBodyElement);
	}

	return true;
};

