/* global aria */
/**
 * validate if a given role is an allowed ARIA role for
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

	// if element can have no role
	if (lookupTable.elementsAllowedNoRole.includes(tagName)) {
		return false;
	}
	// if element can have any role
	if (lookupTable.elementsAllowedAnyRole.includes(tagName)) {
		return true;
	}
	// check role allowedElements
	const roleValue = lookupTable.role[role];

	// if given role does not exist in lookupTable
	if (!roleValue) {
		return false;
	}

	// check if role has allowedElements
	if (
		!(
			roleValue.allowedElements &&
			Array.isArray(roleValue.allowedElements) &&
			roleValue.allowedElements.length
		)
	) {
		return false;
	}

	const nodeAttrs = Array.from(node.attributes).map(a => a.name.toUpperCase());

	let out = false;
	// check if the given element exists in allowedElements for the role
	roleValue.allowedElements.forEach(el => {
		// string
		if (typeof el === 'string') {
			if (el === tagName) {
				out = true;
			}
			return;
		}
		// object - match tag in allowedElement
		if (el.tagName !== tagName) {
			return;
		}
		if (!el.attributes) {
			return;
		}
		el.attributes.forEach(attr => {
			if (!nodeAttrs.includes(attr.name)) {
				return;
			}
			if (typeof attr.value === 'undefined') {
				out = true;
				return;
			}
			if (tagName === 'IMG' && attr.value === '') {
				out = true;
				return;
			}
			if (!node.getAttribute(attr.name)) {
				return;
			}
			const nodeAttrValue = node
				.getAttribute(attr.name)
				.trim()
				.toUpperCase();
			if (attr.value === nodeAttrValue) {
				out = true;
				return;
			}
		});
	});

	// check if tag has a custom function to check its validity against various tags
	if (Object.keys(lookupTable.evaluateRoleForElement).includes(tagName)) {
		out = lookupTable.evaluateRoleForElement[tagName]({ node, role, out });
	}

	return out;
};
