import getRole from '../aria/get-role';

/**
 * Determines if an element is an aria textbox element
 * @method isAriaTextbox
 * @memberof axe.commons.forms
 * @param {Element} node Node to determine if aria textbox
 * @returns {Bool}
 */
function isAriaTextbox(node) {
	const role = getRole(node, { noImplicit: true });
	return role === 'textbox';
}

export default isAriaTextbox;
