return (
	axe.utils
		.tokenList(virtualNode.attr('role'))
		.filter(role => axe.commons.aria.getRoleType(role) === 'abstract').length >
	0
);
