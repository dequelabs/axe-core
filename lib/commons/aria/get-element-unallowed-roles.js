/* global aria */
/**
 * gets all unallowed roles for a given node
 * @method getElementUnallowedRoles
 * @param {Object} node HTMLElement to validate
 * @param {String} tagName tag name of a node
 * @param {String} allowImplicit option to allow implicit roles, defaults to true
 * @return {Array<String>} retruns an array of roles that are not allowed on the given node
 */
aria.getElementUnallowedRoles = function getElementUnallowedRoles(
	node,
	allowImplicit
) {
	/**
	 * Get roles applied to a given node
	 * @param {HTMLElement} node HTMLElement
	 * @return {Array<String>} return an array of roles applied to the node, if no roles, return an empty array.
	 */
	// TODO: not moving this to outer namespace yet, work with wilco to see overlap with his PR(WIP) - aria.getRole
	function getRoleSegments(node) {
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
		return roles;
	}

	const tagName = node.nodeName.toUpperCase();

	// by pass custom elements
	if (!axe.utils.isHtmlElement(node)) {
		return [];
	}

	const roleSegments = getRoleSegments(node);
	const implicitRole = axe.commons.aria.implicitRole(node);

	// stores all roles that are not allowed for a specific element most often an element only has one explicit role
	const unallowedRoles = roleSegments.filter(role => {
		if (!axe.commons.aria.isValidRole(role)) {
			// do not check made-up/ fake roles
			return false;
		}

		// check if an implicit role may be set explicit following a setting
		if (!allowImplicit && role === implicitRole) {
			// edge case: setting implicit role row on tr element is allowed when child of table[role='grid']
			if (
				!(
					role === 'row' &&
					tagName === 'TR' &&
					axe.utils.matchesSelector(node, 'table[role="grid"] > tr')
				)
			) {
				return true;
			}
		}
		if (!aria.isAriaRoleAllowedOnElement(node, role)) {
			return true;
		}
	});

	return unallowedRoles;
};
