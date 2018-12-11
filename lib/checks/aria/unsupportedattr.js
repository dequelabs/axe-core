let unsupported = Array.from(node.attributes)
	.filter(candidate => {
		// filter out unsupported attributes
		return axe.commons.aria.validateAttr(candidate.name, {
			flagUnsupported: true
		});
	})
	.map(candidate => {
		return candidate.name.toString();
	});

if (unsupported.length) {
	this.data(unsupported);
	return true;
}
return false;
