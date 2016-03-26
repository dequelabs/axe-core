
if (['UL', 'OL'].indexOf(node.parentNode.nodeName.toUpperCase()) !== -1) {
	return true;
}

return node.parentNode.getAttribute('role') === 'list';
