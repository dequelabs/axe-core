/* global dom */

/**
 * Determine whether an element is hidden based on css
 * @method isHiddenWithCSS
 * @memberof axe.commons.dom
 * @instance
 * @param {HTMLElement} el The HTML Element
 * @param {Boolean} descendentVisibilityValue (Optional) immediate descendant visibility value used for recursive computation
 * @return {Boolean} the element's hidden status
 */
dom.isHiddenWithCSS = function isHiddenWithCSS(el, descendentVisibilityValue) {
	// 9 === Node.DOCUMENT
	if (el.nodeType === 9) {
		return false;
	}

	// 11 === Node.DOCUMENT_FRAGMENT_NODE
	if (el.nodeType === 11) {
		el = el.host; // swap to host node
	}

	const nodeName = el.nodeName.toUpperCase();
	if (['STYLE', 'SCRIPT'].includes(nodeName)) {
		return false;
	}

	const style = window.getComputedStyle(el, null);
	if (!style) {
		throw new Error('Style does not exist for the given element.');
	}

	if (style.getPropertyValue('display') === 'none') {
		return true;
	}

	const visibilityValue = style.getPropertyValue('visibility');
	if (
		visibilityValue === 'hidden' &&
		(descendentVisibilityValue && descendentVisibilityValue !== 'visible')
	) {
		return true;
	}

	const parent = dom.getComposedParent(el);
	if (parent) {
		return dom.isHiddenWithCSS(parent, visibilityValue);
	}

	return false;
};
