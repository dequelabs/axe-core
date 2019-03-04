const aria = /^aria-/;
if (node.hasAttributes()) {
	let attrs = node.attributes;
	for (let i = 0, l = attrs.length; i < l; i++) {
		if (aria.test(attrs[i].name)) {
			return true;
		}
	}
}

return false;
