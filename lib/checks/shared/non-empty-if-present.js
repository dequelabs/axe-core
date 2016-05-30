// Check for 'default' names, which are given to reset and submit buttons
let nodeName = node.nodeName.toUpperCase();
let type = (node.getAttribute('type') || '').toLowerCase();
let label = node.getAttribute('value');

this.data(label);

if (nodeName === 'INPUT' && ['submit', 'reset'].indexOf(type) !== -1) {
	return label === null;
}
return false;