/**
 * Determines if an element is an aria textbox element
 * @method isAriaTextbox
 * @memberof axe.commons.forms
 * @param {Element} node Node to determine if aria textbox
 * @returns {Bool}
 */
function isAriaTextbox(node) {
	// TODO: es-module-aria.getRole
	const role = axe.commons.aria.getRole(node, { noImplicit: true });
	return role === 'textbox';
}

export default isAriaTextbox;
