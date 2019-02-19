let unsupportedAttrs = Array.from(node.attributes)
	.filter(candidate => {
		// return unsupported attributes
		return axe.commons.aria.validateAttr(candidate.name, {
			flagUnsupported: true
		});
	})
	.map(candidate => {
		return candidate.name.toString();
	});

if (!unsupportedAttrs.length) {
	return false;
}

const nodeName = node.nodeName.toUpperCase();
const lookupTable = axe.commons.aria.lookupTable;
const role = axe.commons.aria.getRole(node);

unsupportedAttrs = unsupportedAttrs.filter(attr => {
	const unsupported = lookupTable.attributes[attr].unsupported;

	if (typeof unsupported === 'boolean' || !unsupported.allowedElements) {
		return true;
	}

	// validate attributes and conditions (if any) from allowedElement to given node
	let out = axe.commons.matches(node, unsupported.allowedElements);

	// if given node type has complex condition to evaluate a given aria-role, execute the same
	if (Object.keys(lookupTable.evaluateRoleForElement).includes(nodeName)) {
		return !lookupTable.evaluateRoleForElement[nodeName]({ node, role, out });
	}
	return !out;
});

if (unsupportedAttrs.length) {
	this.data(unsupportedAttrs);
	return true;
}
return false;
