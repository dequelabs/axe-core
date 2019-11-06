import lookupTable from './lookup-table.js';

/**
 * Get required attributes for a given role
 * @method requiredAttr
 * @memberof axe.commons.aria
 * @instance
 * @param  {String} role The role to check
 * @return {Array}
 */
function requiredAttr(role) {
	var roles = lookupTable.role[role],
		attr = roles && roles.attributes && roles.attributes.required;
	return attr || [];
}

export default requiredAttr;
