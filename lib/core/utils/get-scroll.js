/**
 * Get the scroll position of given element
 * @method getScroll
 * @memberof axe.utils
 * @param {Element} node
 * @param {buffer} (Optional) allowed negligence in overflow
 * @returns {Object | undefined}
 */
axe.utils.getScroll = function getScroll(elm, buffer = 0) {
	const overflowX = elm.scrollWidth > elm.clientWidth + buffer;
	const overflowY = elm.scrollHeight > elm.clientHeight + buffer;

	/**
	 * if there is neither `overflow-x` or `overflow-y`
	 * -> return
	 */
	if (!(overflowX || overflowY)) {
		return;
	}

	const style = window.getComputedStyle(elm);

	// Checking Y before X since we assume that
	// most scrolling is across the Y axis.
	const overflowYStyle = style.getPropertyValue('overflow-y');
	const scrollableY =
		overflowYStyle !== 'visible' && overflowYStyle !== 'hidden';

	if (overflowY && scrollableY) {
		return {
			elm,
			top: elm.scrollTop,
			left: elm.scrollLeft
		};
	}

	const overflowXStyle = style.getPropertyValue('overflow-x');
	const scrollableX =
		overflowXStyle !== 'visible' && overflowXStyle !== 'hidden';

	/**
	 * check direction of `overflow` and `scrollable`
	 */
	if (overflowX && scrollableX) {
		return {
			elm,
			top: elm.scrollTop,
			left: elm.scrollLeft
		};
	}
};
