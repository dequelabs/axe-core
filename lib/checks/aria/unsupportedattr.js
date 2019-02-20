const nodeName = node.nodeName.toUpperCase();
const lookupTable = axe.commons.aria.lookupTable;
const role = axe.commons.aria.getRole(node);

const unsupportedAttrs = Array.from(node.attributes)
	.filter(({ name }) => {
		const attribute = lookupTable.attributes[name];
		if (!axe.commons.aria.validateAttr(name) || !attribute.unsupported) {
			return false;
		}

		const unsupported = attribute.unsupported;

		if (typeof unsupported === 'boolean' || !unsupported.exceptions) {
			return true;
		}

		// validate attributes and conditions (if any) from allowedElement to given node
		let out = axe.commons.matches(node, unsupported.exceptions);

		// if given node type has complex condition to evaluate a given aria-role, execute the same
		if (Object.keys(lookupTable.evaluateRoleForElement).includes(nodeName)) {
			return !lookupTable.evaluateRoleForElement[nodeName]({ node, role, out });
		}
		return !out;
	})
	.map(candidate => candidate.name.toString());

if (unsupportedAttrs.length) {
	this.data(unsupportedAttrs);
	return true;
}
return false;
