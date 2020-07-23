/**
 * Check that the element does not have the `aria-hidden` attribute.
 *
 * @return {Boolean} True if the `aria-hidden` attribute is not present. False otherwise.
 */
function ariaHiddenBodyEvaluate(node) {
	return node.getAttribute('aria-hidden') !== 'true';
}

export default ariaHiddenBodyEvaluate;
