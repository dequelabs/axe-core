const { tokenList } = axe.utils;
const { aria } = axe.commons;

const allRoles = tokenList(virtualNode.attr('role'));
const invalidRoles = allRoles.filter(
	role => !aria.isValidRole(role, { allowAbstract: true })
);

/**
 * Only fail when all the roles are invalid
 */
if (invalidRoles.length > 0 && invalidRoles.length === allRoles.length) {
	this.data(invalidRoles);
	return true;
}

return false;
