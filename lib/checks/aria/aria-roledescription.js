options = options || {};

const role = axe.commons.aria.getRole(node);
const supportedRoles = options.supportedRoles || [];

if (supportedRoles.includes(role)) {
	return true;
}

if (role) {
	return undefined;
}

return false;
