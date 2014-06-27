
var role = node.getAttribute('role');
if (!role) {
	role = kslib.aria.implicitRole(node);
}
var allowed = kslib.aria.allowedAttr(role);
if (role && allowed) {
	var aria = /^aria-/;
	if (node.hasAttributes()) {
		var attrs = node.attributes;
		for (var i = 0, l = attrs.length; i < l; i++) {
			if (aria.test(attrs[i].nodeName)) {
				return true;
			}
		}
	}
}

return false;