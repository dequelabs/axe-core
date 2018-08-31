const { isValidRole, getRole } = axe.commons.aria;
const roleSegments = getRole(node, {
	allowImplicit: false,
	segments: true,
	fallback: true,
	dpub: true
});

// trap any redundant roles
const validRoles = roleSegments.filter(role => {
	return isValidRole(role);
});

if (!validRoles.length) {
	return false;
}

return true;
