const landmarks = axe.commons.aria.getRolesByType('landmark');
let parent = axe.commons.dom.getComposedParent(node);

this.data({
	role: node.getAttribute('role') || axe.commons.aria.implicitRole(node)
});

while (parent) {
	let role = parent.getAttribute('role');
	if (!role && parent.tagName.toLowerCase() !== 'form') {
		role = axe.commons.aria.implicitRole(parent);
	}
	if (role && landmarks.includes(role)) {
		return false;
	}
	parent = axe.commons.dom.getComposedParent(parent);
}
return true;
