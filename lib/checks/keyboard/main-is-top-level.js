var landmarks = axe.commons.aria.getRolesByType('landmark');
var parent = node.parentElement;
while (parent){
	var role = parent.getAttribute('role');
	if (!role){
		role = axe.commons.aria.implicitRole(parent);
	}
	if (role && landmarks.indexOf(role) >= 0){
		return false;
	}
	parent = parent.parentElement;
}
return true;