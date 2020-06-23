import lookupTable from './lookup-table';

/**
 * Get required attributes for a given role
 * @method requiredAttr
 * @memberof axe.commons.aria
 * @instance
 * @param  {String} role The role to check
 * @return {Array}
 */
function requiredAttr(role) {
	const roles = lookupTable.role[role];
	const attr = roles && roles.attributes && roles.attributes.required;
	return attr || [];
}

export default requiredAttr;
