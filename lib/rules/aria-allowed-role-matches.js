const { isValidRole, getRole } = axe.commons.aria;

// get role(s) as array(segments), with fallback and dpub
const roleSegments = getRole(node, {
	segments: true,
	fallback: true,
	dpub: true
});

// filter invalid roles
const validRoles = roleSegments.filter(role => isValidRole(role));

// if no valid roles are applied, ignore
if (!validRoles.length) {
	return false;
}

return true;
