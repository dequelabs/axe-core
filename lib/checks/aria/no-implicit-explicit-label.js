const { aria } = axe.commons;

const role = aria.getRole(node, { noImplicit: true });
this.data(role);

if (aria.isImplicitLabel(virtualNode) || aria.isExplicitLabel(node)) {
	return undefined;
}

return false;
