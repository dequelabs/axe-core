var aria = /^aria-hidden/;
if (node && node.hasAttributes()) {
	var attrs = node.attributes;
	for (var i = 0, l = attrs.length; i < l; i++) {
		if (aria.test(attrs[i].name)) {
			return false;
		}
	}
}

return true;
