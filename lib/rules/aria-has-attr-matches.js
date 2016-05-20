var aria = /^aria-/;
if (node.hasAttributes()) {
	var attrs = node.attributes;
	for (var i = 0, l = attrs.length; i < l; i++) {
		if (aria.test(attrs[i].name)) {
			return true;
		}
	}
}

return false;