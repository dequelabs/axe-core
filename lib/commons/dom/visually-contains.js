/* global dom */

/**
 * Checks whether a parent element visually contains its child, either directly or via scrolling.
 * Assumes that |parent| is an ancestor of |node|.
 * @method visuallyContains
 * @memberof axe.commons.dom
 * @instance
 * @param {Element} node
 * @param {Element} parent
 * @return {boolean} True if node is visually contained within parent
 */
dom.visuallyContains = function(node, parent) {
	var rectBound = node.getBoundingClientRect();
	var margin = 0.01;
	var rect = {
		top: rectBound.top + margin,
		bottom: rectBound.bottom - margin,
		left: rectBound.left + margin,
		right: rectBound.right - margin
	};
	var parentRect = parent.getBoundingClientRect();
	var parentTop = parentRect.top;
	var parentLeft = parentRect.left;
	var parentScrollArea = {
		top: parentTop - parent.scrollTop,
		bottom: parentTop - parent.scrollTop + parent.scrollHeight,
		left: parentLeft - parent.scrollLeft,
		right: parentLeft - parent.scrollLeft + parent.scrollWidth
	};

	var style = window.getComputedStyle(parent);

	// if parent element is inline, scrollArea will be too unpredictable
	if (style.getPropertyValue('display') === 'inline') {
		return true;
	}

	//In theory, we should just be able to look at the scroll area as a superset of the parentRect,
	//but that's not true in Firefox
	if (
		(rect.left < parentScrollArea.left && rect.left < parentRect.left) ||
		(rect.top < parentScrollArea.top && rect.top < parentRect.top) ||
		(rect.right > parentScrollArea.right && rect.right > parentRect.right) ||
		(rect.bottom > parentScrollArea.bottom && rect.bottom > parentRect.bottom)
	) {
		return false;
	}

	if (rect.right > parentRect.right || rect.bottom > parentRect.bottom) {
		return (
			style.overflow === 'scroll' ||
			style.overflow === 'auto' ||
			style.overflow === 'hidden' ||
			parent instanceof HTMLBodyElement ||
			parent instanceof HTMLHtmlElement
		);
	}

	return true;
};
