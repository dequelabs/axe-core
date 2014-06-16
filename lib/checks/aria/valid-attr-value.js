var invalid = [],
	aria = /^aria-/;
if (node.hasAttributes()) {
	var attr, attrName,
		attrs = node.attributes;
	for (var i = 0, l = attrs.length; i < l; i++) {
		attr = attrs[i];
		attrName = attr.nodeName;
		if (aria.test(attrName) && !kslib.aria.validateAttrValue(node, attrName)) {
			invalid.push(attrName + '="' + attr.nodeValue + '"');
		}
	}
}

if (invalid.length) {
	this.data(invalid);
	return false;
}

return true;