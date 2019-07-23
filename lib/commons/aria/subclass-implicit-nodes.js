/* global aria */

/**
 * Get a list of CSS selectors of subclass nodes that have an implicit role
 * @method subclassImplicitNodes
 * @memberof axe.commons.aria
 * @instance
 * @param {String} role The role to check
 * @return {Mixed} Either an Array of CSS selectors or `null` if there are none
 */
aria.subclassImplicitNodes = function(role) {
	const roles = aria.lookupTable.role[role];
	let subclassRoles = [];

	if (roles && roles.subclassRoles) {
		roles.subclassRoles.forEach(subclassRole => {
			const implicit = aria.implicitNodes(subclassRole);

			if (implicit) {
				subclassRoles = subclassRoles.concat(implicit);
			}
		});
	}

	if (subclassRoles.length > 0) {
		return subclassRoles;
	}

	return null;
};
