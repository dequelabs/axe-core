var role = node.getAttribute('role');
if (!role) {
	role = axe.commons.aria.implicitRole(node);
}
var allowed = axe.commons.aria.allowedAttr(role);
if (role && allowed) {
	var aria = /^aria-/;
	if (node.hasAttributes()) {
		var attrs = node.attributes;
		for (var i = 0, l = attrs.length; i < l; i++) {
			if (aria.test(attrs[i].name)) {
				return true;
			}
		}
	}
}

return false;