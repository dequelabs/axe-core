import getRole from '../aria/get-role';

/**
 * Determines if an element is an aria listbox element
 * @method isAriaListbox
 * @memberof axe.commons.forms
 * @param {Element} node Node to determine if aria listbox
 * @returns {Bool}
 */
function isAriaListbox(node) {
	const role = getRole(node, { noImplicit: true });
	return role === 'listbox';
}

export default isAriaListbox;
