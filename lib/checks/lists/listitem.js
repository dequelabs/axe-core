
if (['UL', 'OL'].indexOf(node.parentNode.nodeName) !== -1) {
	return true;
}

return node.parentNode.getAttribute('role') === 'list';
