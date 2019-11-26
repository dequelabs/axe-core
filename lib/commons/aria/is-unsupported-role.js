import lookupTable from './lookup-table';

/**
 * Check if a given role is unsupported
 * @method isUnsupportedRole
 * @memberof axe.commons.aria
 * @instance
 * @param {String} role The role to check
 * @return {Boolean}
 */
function isUnsupportedRole(role) {
	const roleDefinition = lookupTable.role[role];
	return roleDefinition ? roleDefinition.unsupported : false;
}

export default isUnsupportedRole;
