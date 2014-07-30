/* global dom, utils */



/**
 * Find a non-ARIA label for an element
 *
 * @param {HTMLElement} element The HTMLElement
 * @return {HTMLElement} The label element, or null if none is found 
 */
dom.findLabel = function (element) {
	var ref = null;
	if (element.id) {
		ref = element.ownerDocument.querySelector('label[for="' + utils.escapeSelector(element.id) + '"]');
		if (ref) { return ref; }
	}
	ref = dom.findUp(element, 'label');
	return ref;
};
