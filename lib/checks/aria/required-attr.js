options = options || {};

var missing = [];

if (node.hasAttributes()) {
	var attr,
		role = node.getAttribute('role'),
		required = axe.commons.aria.requiredAttr(role);

	if (Object.keys(options).length) {
		for (var roleOption in options) {
			if (roleOption === role) {
				required = axe.utils.uniqueArray(options[role].concat(required));
			}
		}
	}
	if (role && required) {
		for (var i = 0, l = required.length; i < l; i++) {
			attr = required[i];
			if (!node.getAttribute(attr)) {
				missing.push(attr);
			}
		}
	}
}

if (missing.length) {
	this.data(missing);
	return false;
}

return true;