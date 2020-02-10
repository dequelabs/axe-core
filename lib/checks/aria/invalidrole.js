const invalidRoles = axe.utils
	.tokenList(virtualNode.attr('role'))
	.filter(role => {
		return !axe.commons.aria.isValidRole(role, {
			allowAbstract: true
		});
	});

if (invalidRoles.length > 0) {
	this.data(invalidRoles);
	return true;
}

return false;
