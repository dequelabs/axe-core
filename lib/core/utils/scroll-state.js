/**
 * Create an array scroll positions from descending elements
 */
function getElmScrollRecursive(root) {
	// Need to also get .childNodes since SVGs in IE don't have .children.
	return Array.from(root.children || root.childNodes || []).reduce(
		(scrolls, elm) => {
			const scroll = axe.utils.getScroll(elm);
			if (scroll) {
				scrolls.push(scroll);
			}
			return scrolls.concat(getElmScrollRecursive(elm));
		},
		[]
	);
}

/**
 * Get the scroll position of all scrollable elements in a page
 */
function scrollState(win = window) {
	const root = win.document.documentElement;
	const windowScroll = [
		win.pageXOffset !== undefined
			? {
					elm: win,
					top: win.pageYOffset,
					left: win.pageXOffset
			  }
			: {
					elm: root,
					top: root.scrollTop,
					left: root.scrollLeft
			  }
	];

	return windowScroll.concat(getElmScrollRecursive(document.body));
}

export default scrollState;
