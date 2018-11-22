/* global dom */

/**
 * Get all descendents that are focusable from a given node
 * @method getFocusableElements
 * @memberof axe.commons.dom
 * @instance
 * @param  {Object} virtualNode The virtualNode to assess
 * @return {Boolean}
 */
dom.getFocusableElements = function getFocusableElements(virtualNode) {
	const descendents = axe.utils.querySelectorAll(virtualNode, '*');
	const focusableElms = descendents.filter(({ actualNode: el }) => {
		const isElFocusable = dom.isFocusable(el);
		return isElFocusable;
	});
	return focusableElms;
};
