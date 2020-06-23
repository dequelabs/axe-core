import isHiddenWithCSS from './is-hidden-with-css';

/**
 * Determines if focusing has been disabled on an element.
 * @param {HTMLElement} el The HTMLElement
 * @return {Boolean} Whether focusing has been disabled on an element.
 */
function focusDisabled(el) {
	return (
		el.disabled || (el.nodeName.toUpperCase() !== 'AREA' && isHiddenWithCSS(el))
	);
}

export default focusDisabled;
