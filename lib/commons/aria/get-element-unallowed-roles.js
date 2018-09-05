/* global aria */

/**
 * gets all unallowed roles for a given node
 * @method getElementUnallowedRoles
 * @param {Object} node HTMLElement to validate
 * @param {String} tagName tag name of a node
 * @param {String} allowImplicit option to allow implicit roles, defaults to true
 * @return {Array<String>} retruns an array of roles that are not allowed on the given node
 */
aria.getElementUnallowedRoles = function getElementUnallowedRoles(
	node,
	allowImplicit
) {
	const tagName = node.nodeName.toUpperCase();

	// by pass custom elements
	if (!axe.utils.isHtmlElement(node)) {
		return [];
	}

	const roleSegments = axe.commons.aria.getRoleSegments(node);
	const implicitRole = axe.commons.aria.implicitRole(node);

	// stores all roles that are not allowed for a specific element most often an element only has one explicit role
	const unallowedRoles = roleSegments.filter(role => {
		// check if an implicit role may be set explicit following a setting
		if (!allowImplicit && role === implicitRole) {
			// edge case: setting implicit role row on tr element is allowed when child of table[role='grid']
			if (
				!(
					role === 'row' &&
					tagName === 'TR' &&
					axe.utils.matchesSelector(node, 'table[role="grid"] > tr')
				)
			) {
				return true;
			}
		}

		// if role and implicit role are same, it is redundant - ignore
		if (role === implicitRole) {
			return false;
		}

		if (!aria.isAriaRoleAllowedOnElement(node, role)) {
			return true;
		}
	});

	return unallowedRoles;
};
