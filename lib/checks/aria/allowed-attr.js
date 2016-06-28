var invalid = [];

var attr, attrName, allowed,
	role = node.getAttribute('role'),
	attrs = node.attributes;

if (!role) {
	role = axe.commons.aria.implicitRole(node);
}
allowed = axe.commons.aria.allowedAttr(role);
if (role && allowed) {
	for (var i = 0, l = attrs.length; i < l; i++) {
		attr = attrs[i];
		attrName = attr.name;
		if (axe.commons.aria.validateAttr(attrName) && allowed.indexOf(attrName) === -1) {
			invalid.push(attrName + '="' + attr.nodeValue + '"');
		}
	}
}

if (invalid.length) {
	this.data(invalid);
	return false;
}

return true;