/* global aria */

/**
 * Get a list of CSS selectors of subclass nodes that have an implicit role
 * @method getRoleInheritance
 * @memberof axe.commons.aria
 * @instance
 * @param {String} role The role to check
 * @return {Mixed} Either an Array of CSS selectors or `null` if there are none
 */
aria.getRoleInheritance = function(role) {
	const roles = aria.lookupTable.role;
	let roleInheritance = [role];

	for (const roleName in roles) {
		if (roles[roleName].superclassRole === role) {
			roleInheritance = roleInheritance.concat(aria.getRoleInheritance(roleName));
		}
	}

	return roleInheritance;
};
