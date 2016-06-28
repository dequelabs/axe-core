options = Array.isArray(options) ? options : [];

var invalid = [],
	aria = /^aria-/;

var attr, attrName,
	attrs = node.attributes;

for (var i = 0, l = attrs.length; i < l; i++) {
	attr = attrs[i];
	attrName = attr.name;
	if (options.indexOf(attrName) === -1 && aria.test(attrName) &&
		!axe.commons.aria.validateAttrValue(node, attrName)) {

		invalid.push(attrName + '="' + attr.nodeValue + '"');
	}
}

if (invalid.length) {
	this.data(invalid);
	return false;
}

return true;
