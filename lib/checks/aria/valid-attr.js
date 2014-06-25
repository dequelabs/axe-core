var invalid = [],
	aria = /^aria-/;
var attr,
	attrs = node.attributes;
for (var i = 0, l = attrs.length; i < l; i++) {
	attr = attrs[i].nodeName;
	if (aria.test(attr) && !kslib.aria.validateAttr(attr)) {
		invalid.push(attr);
	}
}

if (invalid.length) {
	this.data(invalid);
	return false;
}

return true;