
var tabIndex = node.getAttribute('tabindex'),
	focusableWithTabindex = axe.commons.dom.isFocusable(node) && tabIndex > -1;

// if the element is natively focusable without tabindex, it passes
if (axe.commons.dom.isFocusable(node) && tabIndex === null) {
	return true;
}
var accRoles = ['button', 'checkbox', 'tab', 'menuitem', 'menuitemcheckbox'],
	roleAttr = node.getAttribute('role');

node.hasAccessibleRole = false;

for (var i=0; i<accRoles.length; i++) {
	// if node has accessible role and is focusable, it passes
	if (roleAttr && roleAttr === accRoles[i] && focusableWithTabindex) {
		node.hasAccessibleRole = true;
	}
}
return node.hasAccessibleRole;
