var invalid = [],
	aria = /^aria-/;

if (node.hasAttributes()) {
	var attr, attrName, allowed,
		role = node.getAttribute('role'),
		attrs = node.attributes;

	if (!role) {
		role = kslib.aria.implicitRole(node);
	}
	allowed = kslib.aria.allowedAttr(role);
	if (role && allowed) {
		for (var i = 0, l = attrs.length; i < l; i++) {
			attr = attrs[i];
			attrName = attr.nodeName;
			if (aria.test(attrName) && allowed.indexOf(attrName) === -1) {
				invalid.push(attrName + '="' + attr.nodeValue + '"');
			}
		}
	}
}

if (invalid.length) {
	this.data(invalid);
	return false;
}

return true;