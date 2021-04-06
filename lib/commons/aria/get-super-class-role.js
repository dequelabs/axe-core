import standards from '../../standards';

/**
 * Get the "superclassRole" of role
 * @method getSuperClassRole
 * @memberof axe.commons.aria
 * @instance
 * @param {String} role The role to check
 * @return {Mixed} String if a matching role and its superclassRole are found, otherwise `null`
 */
function getSuperClassRole(role) {
	const roleDef = standards.ariaRoles[role];

	if (!roleDef) {
		return null;
	}

	return roleDef.superclassRole;
}

export default getSuperClassRole;
