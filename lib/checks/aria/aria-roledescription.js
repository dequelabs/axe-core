const role = axe.commons.aria.getRole(node);
const supportedRoles = [
	'button',
	'img',
	'checkbox',
	'radio',
	'combobox',
	'menuitemcheckbox',
	'menuitemradio'
];

if (supportedRoles.includes(role)) {
	return true;
}

if (role) {
	return undefined;
}

return false;
