/* global aria, axe */

/**
 * Get required attributes for a given role
 * @method requiredAttr
 * @memberof axe.commons.aria
 * @instance
 * @param  {String} role The role to check
 * @return {Array}
 */
aria.requiredAttr = function(role) {
	var roles = aria.lookupTable.role[role],
		attr = roles && roles.attributes && roles.attributes.required;
	return attr || [];
};

/**
 * Get allowed attributes for a given role
 * @method allowedAttr
 * @memberof axe.commons.aria
 * @instance
 * @param  {String} role The role to check
 * @return {Array}
 */
aria.allowedAttr = function(role) {
	var roles = aria.lookupTable.role[role],
		attr = (roles && roles.attributes && roles.attributes.allowed) || [],
		requiredAttr =
			(roles && roles.attributes && roles.attributes.required) || [];

	return attr.concat(aria.lookupTable.globalAttributes).concat(requiredAttr);
};

/**
 * Check if an aria- attribute name is valid
 * @method validateAttr
 * @memberof axe.commons.aria
 * @instance
 * @param  {String} att The attribute name
 * @param  {Object} options Use `flagUnsupported: true` to report unsupported attributes
 * @return {Boolean}
 */
aria.validateAttr = function(att, { flagUnsupported = false } = {}) {
	const attrDefinition = aria.lookupTable.attributes[att];
	if (flagUnsupported && attrDefinition) {
		return !!attrDefinition.unsupported;
	}
	return !!attrDefinition;
};
