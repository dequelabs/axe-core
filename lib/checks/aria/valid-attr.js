options = Array.isArray(options) ? options : [];

const invalid = [],
	aria = /^aria-/;

let attr,
	attrs = node.attributes;

for (let i = 0, l = attrs.length; i < l; i++) {
	attr = attrs[i].name;
	if (
		options.indexOf(attr) === -1 &&
		aria.test(attr) &&
		!axe.commons.aria.validateAttr(attr)
	) {
		invalid.push(attr);
	}
}

if (invalid.length) {
	this.data(invalid);
	return false;
}

return true;
