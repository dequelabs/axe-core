
var role = node.getAttribute('role');
if (!role) {
	role = kslib.aria.implicitRole(node);
}
var allowed = kslib.aria.allowedAttr(role);
return !!role && !!allowed;