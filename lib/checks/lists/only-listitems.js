var bad = [],
	permitted = ['STYLE', 'META', 'LINK', 'MAP', 'AREA', 'SCRIPT', 'DATALIST', 'TEMPLATE'],
	hasNonEmptyTextNode = false,
	hasListItem = false,
	liItemsWithRole = 0,
	isEmpty = true;

virtualNode.children.forEach(({ actualNode }) => {
	var nodeName = actualNode.nodeName.toUpperCase();
	var isListItemRole = false;

	if (actualNode.nodeType === 1 && permitted.indexOf(nodeName) === -1) {
		var role = (actualNode.getAttribute('role') || '').toLowerCase();
		isListItemRole = role === 'listitem' || (nodeName === 'LI' && !role);
		hasListItem = hasListItem || (nodeName === 'LI' && isListItemRole) || isListItemRole;

		if (isListItemRole) {
			isEmpty = false;
		}

		if (nodeName === 'LI' && !isListItemRole) {
			liItemsWithRole++;
		}

		if (nodeName !== 'LI' && !isListItemRole) {
			bad.push(actualNode);
		}

	} else if (actualNode.nodeType === 3 && actualNode.nodeValue.trim() !== '') {
		hasNonEmptyTextNode = true;
	}
});

var allLiItemsHaveRole = liItemsWithRole > 0 && virtualNode.children.filter(({ actualNode }) =>
	actualNode.nodeName === 'LI').length === liItemsWithRole;

if (bad.length) {
	this.relatedNodes(bad);
}

return !(hasListItem || (isEmpty && !allLiItemsHaveRole)) || !!bad.length || hasNonEmptyTextNode;
