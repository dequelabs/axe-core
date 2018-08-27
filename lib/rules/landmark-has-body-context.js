const nativeScopeFilter = 'article, aside, main, nav, section';

// Filter elements that, within certain contexts, don't map their role.
// e.g. a <footer> inside a <main> is not a banner, but in the <body> context it is
return (
	node.hasAttribute('role') ||
	!axe.commons.dom.findUpVirtual(virtualNode, nativeScopeFilter)
);
