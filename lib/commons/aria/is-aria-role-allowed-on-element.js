/* global aria */
/**
 * @description validate if a given role is an allowed ARIA role for the supplied node
 * @method isAriaRoleAllowedOnElement
 * @param {HTMLElement} node the node to verify
 * @param {String} role aria role to check
 * @return {Boolean} retruns true/false
 */
aria.isAriaRoleAllowedOnElement = function isAriaRoleAllowedOnElement(
	node,
	role
) {
	const tagName = node.nodeName.toUpperCase();
	const lookupTable = axe.commons.aria.lookupTable;

	// if given node can have no role - return false
	if (aria.validateNodeAndAttributes(node, lookupTable.elementsAllowedNoRole)) {
		return false;
	}

	// if given node allows any role - return true
	if (
		aria.validateNodeAndAttributes(node, lookupTable.elementsAllowedAnyRole)
	) {
		return true;
	}

	// get role value (if exists) from lookupTable.role
	const roleValue = lookupTable.role[role];

	// if given role does not exist in lookupTable - return false
	if (!roleValue) {
		return false;
	}

	// check if role has allowedElements - if not return false
	if (
		!(
			roleValue.allowedElements &&
			Array.isArray(roleValue.allowedElements) &&
			roleValue.allowedElements.length
		)
	) {
		return false;
	}

	let out = false;
	// validate attributes and conditions (if any) from allowedElement to given node
	out = aria.validateNodeAndAttributes(node, roleValue.allowedElements);

	// if given node type has complex condition to evaluate a given aria-role, execute the same
	if (Object.keys(lookupTable.evaluateRoleForElement).includes(tagName)) {
		out = lookupTable.evaluateRoleForElement[tagName]({ node, role, out });
	}

	// return
	return out;
};
