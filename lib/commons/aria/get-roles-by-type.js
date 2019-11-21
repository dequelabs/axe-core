import lookupTable from './lookup-table';

/**
 * Get the roles that have a certain "type"
 * @method getRolesByType
 * @memberof axe.commons.aria
 * @instance
 * @param {String} roleType The roletype to check
 * @return {Array} Array of roles that match the type
 */
function getRolesByType(roleType) {
	return Object.keys(lookupTable.role).filter(function(r) {
		return lookupTable.role[r].type === roleType;
	});
}

export default getRolesByType;
