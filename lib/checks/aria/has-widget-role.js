const role = node.getAttribute('role');
if (role === null) {
	return false;
}
const roleType = axe.commons.aria.getRoleType(role);
return roleType === 'widget' || roleType === 'composite';
