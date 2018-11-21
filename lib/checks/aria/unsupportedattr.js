let unsupported;
if (node.hasAttributes()) {
	unsupported = [].slice
		.call(node.attributes)
		.filter(candidate => {
			// skip non-ARIA attributes
			if (/aria-/.test(candidate.name)) {
				// filter out unsupported attributes
				return !axe.commons.aria.validateAttr(candidate.name, {
					flagUnsupported: true
				});
			}
		})
		.map(candidate => {
			return candidate.name.toString();
		});
}
if (unsupported.length) {
	this.data(unsupported);
	return true;
}
return false;
