if (['none', 'presentation'].includes(node.getAttribute('role'))) {
	return false;
}

const parent = axe.commons.dom.findUpVirtual(
	virtualNode,
	'button, [role="button"], a[href], p, li, td, th'
);
const parentVNode = axe.utils.getNodeFromTree(parent);
const text = axe.commons.text.visibleVirtual(parentVNode, true).toLowerCase();
if (text === '') {
	return false;
}

return (
	text === axe.commons.text.accessibleTextVirtual(virtualNode).toLowerCase()
);
