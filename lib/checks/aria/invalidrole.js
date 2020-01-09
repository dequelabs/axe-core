return (
	axe.utils.tokenList(virtualNode.attr('role')).filter(role => {
		return !axe.commons.aria.isValidRole(role, {
			allowAbstract: true
		});
	}).length > 0
);
