/**
 * Note:
 * This rule filters elements with `role` attribute via `selector`
 */
const { aria } = axe.commons;

const nodeName = node.nodeName.toUpperCase();
const role = aria.getRole(node, { noImplicit: true });

/**
 * Ignore elements from rule -> `area-alt`
 */
if (nodeName === 'AREA' && !!node.getAttribute('href')) {
	return false;
}

/**
 * Ignore elements from rule -> `label`
 */
if (['INPUT', 'SELECT', 'TEXTAREA'].includes(nodeName)) {
	return false;
}

/**
 * Ignore elements from rule -> `image-alt`
 */
if (nodeName === 'IMG' || (role === 'img' && nodeName !== 'SVG')) {
	return false;
}

/**
 * Ignore elements from rule -> `button-name`
 */
if (nodeName === 'BUTTON' || role === 'button') {
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
