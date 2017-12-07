var landmarks = axe.commons.aria.getRolesByType('landmark');
var parent = node.parentNode;
while (parent) {
	if (parent.nodeType === 1) {
		var role = parent.getAttribute('role');
		if (!role && (parent.tagName.toLowerCase() !== 'form')) {
			role = axe.commons.aria.implicitRole(parent);
		}
		if (role && landmarks.includes(role)) {
			return false;
		}
	}
	parent = parent.parentNode;
}
return true;
