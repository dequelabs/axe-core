/* global aria, axe */

/**
 * Returns all roles applicable to element in a list
 *
 * @method getRoleSegments
 * @memberof axe.commons.aria
 * @instance
 * @param {Element} node
 * @returns {Array} Roles list or empty list
 */

aria.getRoleSegments = function getRoleSegments(node) {
	let roles = [];

	if (!node) {
		return roles;
	}

	if (node.hasAttribute('role')) {
		const nodeRoles = axe.utils.tokenList(
			node.getAttribute('role').toLowerCase()
		);
		roles = roles.concat(nodeRoles);
	}

	if (node.hasAttributeNS('http://www.idpf.org/2007/ops', 'type')) {
		const epubRoles = axe.utils
			.tokenList(
				node
					.getAttributeNS('http://www.idpf.org/2007/ops', 'type')
					.toLowerCase()
			)
			.map(role => `doc-${role}`);

		roles = roles.concat(epubRoles);
	}

	// filter invalid roles
	roles = roles.filter(role => axe.commons.aria.isValidRole(role));

	// return
	return roles;
};
