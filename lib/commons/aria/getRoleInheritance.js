/* global aria */

/**
 * Recursively get a list of role names that inherit from the given role.
 * @method getRoleInheritance
 * @memberof axe.commons.aria
 * @instance
 * @param {String} role The role to check
 * @return {String[]} An array of role names including the given role
 */
aria.getRoleInheritance = function(role) {
	const roles = aria.lookupTable.role;
	let roleInheritance = [role];

	for (const roleName in roles) {
		if (roles[roleName].superclassRole === role) {
			roleInheritance = roleInheritance.concat(
				aria.getRoleInheritance(roleName)
			);
		}
	}

	return roleInheritance;
};
