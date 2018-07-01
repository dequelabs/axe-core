if (!options || !options.selector || typeof options.selector !== 'string') {
	throw new TypeError(
		'visible-in-page requires options.selector to be a string'
	);
}

let elms = axe.utils.querySelectorAll(virtualNode, options.selector);

// Filter elements that, within certain contexts, don't map their role.
// e.g. a <footer> inside a <main> is not a banner, but in the <body> context it is
if (typeof options.nativeScopeFilter === 'string') {
	elms = elms.filter(elm => {
		return (
			elm.actualNode.hasAttribute('role') ||
			!axe.commons.dom.findUpVirtual(elm, options.nativeScopeFilter)
		);
	});
}

this.relatedNodes(elms.map(elm => elm.actualNode));

return elms.length <= 1;
