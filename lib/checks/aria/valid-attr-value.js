options = Array.isArray(options) ? options : [];

const invalid = [],
	aria = /^aria-/;

let attr,
	attrName,
	attrs = node.attributes;

const skipAttrs = ['aria-errormessage'];

for (let i = 0, l = attrs.length; i < l; i++) {
	attr = attrs[i];
	attrName = attr.name;
	// skip any attributes handled elsewhere
	if (!skipAttrs.includes(attrName)) {
		if (
			options.indexOf(attrName) === -1 &&
			aria.test(attrName) &&
			!axe.commons.aria.validateAttrValue(node, attrName)
		) {
			invalid.push(attrName + '="' + attr.nodeValue + '"');
		}
	}
}

if (invalid.length) {
	this.data(invalid);
	return false;
}

return true;
