options = Array.isArray(options) ? options : [];

var invalid = [],
	aria = /^aria-/;

var attr,
	attrs = node.attributes;

for (var i = 0, l = attrs.length; i < l; i++) {
	attr = attrs[i].nodeName;
	if (options.indexOf(attr) === -1 && aria.test(attr) && !commons.aria.validateAttr(attr)) {
		invalid.push(attr);
	}
}

if (invalid.length) {
	this.data(invalid);
	return false;
}

return true;
