/**
 * Get the scroll position of given element
 */
axe.utils.getScroll = function getScroll(elm) {
	const style = window.getComputedStyle(elm);
	const visibleOverflowY = style.getPropertyValue('overflow-y') === 'visible';
	const visibleOverflowX = style.getPropertyValue('overflow-x') === 'visible';

	if (
		// See if the element hides overflowing content
		(!visibleOverflowY && elm.scrollHeight > elm.clientHeight) ||
		(!visibleOverflowX && elm.scrollWidth > elm.clientWidth)
	) {
		return {
			elm,
			top: elm.scrollTop,
			left: elm.scrollLeft
		};
	}
};

// TODO: write tests for this utility fn
