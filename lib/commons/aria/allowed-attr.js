import lookupTable from './lookup-table.js';

/**
 * Get allowed attributes for a given role
 * @method allowedAttr
 * @memberof axe.commons.aria
 * @instance
 * @param  {String} role The role to check
 * @return {Array}
 */
function allowedAttr(role) {
	var roles = lookupTable.role[role],
		attr = (roles && roles.attributes && roles.attributes.allowed) || [],
		requiredAttr =
			(roles && roles.attributes && roles.attributes.required) || [];

	return attr.concat(lookupTable.globalAttributes).concat(requiredAttr);
}

export default allowedAttr;
