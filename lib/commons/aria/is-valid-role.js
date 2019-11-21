import lookupTable from './lookup-table';

/**
 * Check if a given role is valid
 * @method isValidRole
 * @memberof axe.commons.aria
 * @instance
 * @param {String} role The role to check
 * @param {Object} options Use `allowAbstract` if you want abstracts, and `flagUnsupported: true` to report unsupported roles
 * @return {Boolean}
 */
function isValidRole(role, { allowAbstract, flagUnsupported = false } = {}) {
	const roleDefinition = lookupTable.role[role];
	const isRoleUnsupported = roleDefinition ? roleDefinition.unsupported : false;
	if (!roleDefinition || (flagUnsupported && isRoleUnsupported)) {
		return false;
	}
	return allowAbstract ? true : roleDefinition.type !== 'abstract';
}

export default isValidRole;
