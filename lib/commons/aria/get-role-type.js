import lookupTable from './lookup-table';

/**
 * Get the "type" of role; either widget, composite, abstract, landmark or `null`
 * @method getRoleType
 * @memberof axe.commons.aria
 * @instance
 * @param {String} role The role to check
 * @return {Mixed} String if a matching role and its type are found, otherwise `null`
 */
function getRoleType(role) {
	var r = lookupTable.role[role];
	return (r && r.type) || null;
}

export default getRoleType;
