// Check for 'default' names, which are given to reset and submit buttons
let nodeName = node.nodeName.toUpperCase();
let type = (node.getAttribute('type') || '').toLowerCase();
let label = node.getAttribute('value');

// Edge / IE set a default value, we want to filter those out.
const { submitDefault, resetDefault } = axe.commons.text.EdgeFormDefaults;
if ((type === 'submit' && label === submitDefault) ||
		(type === 'reset' && label === resetDefault)) {
	label = null;
}

this.data(label);

if (nodeName === 'INPUT' && ['submit', 'reset'].includes(type)) {
	return label === null;
}
return false;