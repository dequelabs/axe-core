/**
 * Determines if an element is an aria listbox element
 * @method isAriaListbox
 * @memberof axe.commons.forms
 * @param {Element} node Node to determine if aria listbox
 * @returns {Bool}
 */
function isAriaListbox(node) {
	// TODO: es-module-aria.getRole
	const role = axe.commons.aria.getRole(node, { noImplicit: true });
	return role === 'listbox';
}

export default isAriaListbox;
