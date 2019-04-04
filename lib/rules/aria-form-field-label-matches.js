const { aria } = axe.commons;

const role = aria.getRole(node, { noImplicit: true });

if (!role) {
	return false;
}

const allowedRoles = [
	'checkbox',
	'combobox',
	'listbox',
	'menuitemcheckbox',
	'menuitemradio',
	'radio',
	'searchbox',
	'slider',
	'spinbutton',
	'switch',
	'textbox'
];

if (allowedRoles.includes(role)) {
	return true;
}

return false;
