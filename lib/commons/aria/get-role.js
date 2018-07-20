/* global aria, axe */

aria.getRole = function getRole(
	node,
	{ noImplicit, tokenList, abstracts, dpub } = {}
) {
	const roleAttr = (node.getAttribute('role') || '').trim().toLowerCase();
	const roleList = tokenList ? axe.utils.tokenList(roleAttr) : [roleAttr];

	// Get the first valid role:
	const validRoles = roleList.filter(role => {
		if (!dpub && role.substr(0, 4) === 'doc-') {
			return false;
		}
		return aria.isValidRole(role, { allowAbstract: abstracts });
	});
	const role = validRoles[0];

	// Get the impgit licit role, if permitted
	if (!role && !noImplicit) {
		return aria.implicitRole(node);
	}

	return role || null;
};
