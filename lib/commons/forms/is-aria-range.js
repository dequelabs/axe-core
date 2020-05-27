import getRole from '../aria/get-role';

const rangeRoles = ['progressbar', 'scrollbar', 'slider', 'spinbutton'];

/**
 * Determines if an element is an aria range element
 * @method isAriaRange
 * @memberof axe.commons.forms
 * @param {Element} node Node to determine if aria range
 * @returns {Bool}
 */
function isAriaRange(node) {
	const role = getRole(node, { noImplicit: true });
	return rangeRoles.includes(role);
}

export default isAriaRange;
