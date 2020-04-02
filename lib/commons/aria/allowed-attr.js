import lookupTable from './lookup-table';

/**
 * Get allowed attributes for a given role
 * @method allowedAttr
 * @memberof axe.commons.aria
 * @instance
 * @param  {String} role The role to check
 * @return {Array}
 */
function allowedAttr(role) {
	const roles = lookupTable.role[role];
	const attr = (roles && roles.attributes && roles.attributes.allowed) || [];
	const requiredAttr =
		(roles && roles.attributes && roles.attributes.required) || [];

	return attr.concat(lookupTable.globalAttributes).concat(requiredAttr);
}

export default allowedAttr;
