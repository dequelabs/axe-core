/**
 * Get the scroll position of given element
 * @method getScroll
 * @memberof axe.utils
 * @param {Element} node
 * @param {buffer} (Optional) allowed negligence in overflow
 * @returns {Object | undefined}
 */
axe.utils.getScroll = function getScroll(elm, buffer = 0) {
	if (
		elm.scrollHeight < elm.clientHeight ||
		elm.scrollWidth < elm.clientWidth
	) {
		return;
	}

	const overflowX = elm.scrollWidth - elm.clientWidth;
	const overflowY = elm.scrollHeight - elm.clientHeight;
	const maxOverflow = Math.max(overflowX, overflowY);
	if (maxOverflow <= buffer) {
		return;
	}

	const style = window.getComputedStyle(elm);
	const visibleOverflowY = style.getPropertyValue('overflow-y') === 'visible';
	const visibleOverflowX = style.getPropertyValue('overflow-x') === 'visible';

	// See if the element hides overflowing content
	if (!visibleOverflowY || !visibleOverflowX) {
		return {
			elm,
			top: elm.scrollTop,
			left: elm.scrollLeft
		};
	}
};
