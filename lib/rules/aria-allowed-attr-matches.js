let role = node.getAttribute('role');
if (!role) {
	role = axe.commons.aria.implicitRole(node);
}
const allowed = axe.commons.aria.allowedAttr(role);
if (role && allowed) {
	const ariaMatch = /^aria-/;
	if (node.hasAttributes()) {
		const attrs = node.attributes;
		for (let i = 0, l = attrs.length; i < l; i++) {
			if (ariaMatch.test(attrs[i].name)) {
				return true;
			}
		}
	}
}

return false;
