/* global dom */

/**
 * Determines whether an element has a fully opaque background, whether solid color or an image
 * @param {Element} node
 * @return {Boolean} false if the background is transparent, true otherwise
 */
dom.isOpaque = function(node) {
	const style = window.getComputedStyle(node);
	return (
		axe.commons.color.elementHasImage(node, style) ||
		axe.commons.color.getOwnBackgroundColor(style).alpha === 1
	);
};
