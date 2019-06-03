options = Array.isArray(options) ? options : [];

const invalid = [];
const aria = /^aria-/;
const attrs = axe.utils.getNodeAttributes(node);

const skipAttrs = ['aria-errormessage'];

// aria-controls should only check if element exists if the element
// doesn't have aria-expanded=false or aria-selected=false (tabs)
// @see https://github.com/dequelabs/axe-core/issues/1463
const preChecks = {
	'aria-controls': function() {
		return (
			node.getAttribute('aria-expanded') !== 'false' &&
			node.getAttribute('aria-selected') !== 'false'
		);
	},
	// aria-owns should only check if element exists if the element
	// doesn't have aria-expanded=false (combobox)
	// @see https://github.com/dequelabs/axe-core/issues/1524
	'aria-owns': function() {
		return node.getAttribute('aria-expanded') !== 'false';
	}
};

for (let i = 0, l = attrs.length; i < l; i++) {
	const attr = attrs[i];
	const attrName = attr.name;
	// skip any attributes handled elsewhere
	if (
		!skipAttrs.includes(attrName) &&
		options.indexOf(attrName) === -1 &&
		aria.test(attrName) &&
		(preChecks[attrName] ? preChecks[attrName]() : true) &&
		!axe.commons.aria.validateAttrValue(node, attrName)
	) {
		invalid.push(`${attrName}="${attr.nodeValue}"`);
	}
}

if (invalid.length) {
	this.data(invalid);
	return false;
}

return true;
