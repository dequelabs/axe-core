// Get all valid roles
let explicitRoles;
if (node.hasAttribute('role')) {
	explicitRoles = axe.utils
		.tokenList(node.getAttribute('role'))
		.filter(role =>
			axe.commons.aria.isValidRole(role, { disallowAbstract: true })
		);
}
console.log(explicitRoles);

// Check valid roles if there are any, otherwise fall back to the inherited role
if (explicitRoles && explicitRoles.length > 0) {
	return explicitRoles.includes('heading');
} else {
	return axe.commons.aria.implicitRole(node) === 'heading';
}
