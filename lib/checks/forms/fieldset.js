if (!node.name) { return false; }

var matchingNodes = node.ownerDocument.querySelectorAll('input[type=' + options + '][name=' + node.name + ']');
if (matchingNodes.length <= 1) { return false; }

var parentFieldset, parentGroup = null;
var p = node;

//find nearest fieldset and role=group parent
while (p.parentElement && !(parentFieldset && parentGroup)) {
	if (p.parentElement.nodeName === 'FIELDSET' && !parentFieldset) {
		parentFieldset = p.parentElement;
	}
	if (p.parentElement.getAttribute('role') &&
		p.parentElement.getAttribute('role').toLowerCase() === 'group' &&
			!parentGroup) {
		parentGroup = p.parentElement;
	}
	p = p.parentElement;
}

var containsProperFormElements = function (groupParent) {
	var groupNodes = groupParent.querySelectorAll('input[type=' + options + '][name=' + node.name + ']');
	var otherNodes = groupParent.querySelectorAll('select,textarea,button,input:not([name=' + node.name + '])');
	return groupNodes.length === matchingNodes.length && otherNodes.length === 0;
};

if (parentFieldset) {
	var firstNode = parentFieldset.firstElementChild;
	if (firstNode && firstNode.nodeName === 'LEGEND' &&
		kslib.text.visible(firstNode) && containsProperFormElements(parentFieldset)) { return true; }
}

if (parentGroup) {
	if (containsProperFormElements(parentGroup)) { return true; }
}

return false;
