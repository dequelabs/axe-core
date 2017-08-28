var landmarks = axe.commons.aria.getRolesByType('landmark');
var parent = node.commons.dom.getComposedParent(parent);
while (parent){
	var role = parent.getAttribute('role');
	if (!role && (parent.tagName.toLowerCase() !== 'form')){
		role = axe.commons.aria.implicitRole(parent);
	}
	if (role && landmarks.includes(role)){
		return false;
	}
	parent = axe.commons.dom.getComposedParent(parent);
}
return true;
