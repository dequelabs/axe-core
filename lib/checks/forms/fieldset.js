this.data({
	name: node.getAttribute('name'),
	type: node.getAttribute('type')
});

var escapedName = kslib.utils.escapeSelector(node.name);
var sameGroupSelector = 'input[type="' + kslib.utils.escapeSelector(node.type) + '"][name="' + escapedName + '"]';
var matchingNodes = node.ownerDocument.querySelectorAll(sameGroupSelector);
if (matchingNodes.length <= 1) {
	return true;
}

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

function containsProperFormElements(groupParent) {
	var groupNodes = groupParent.querySelectorAll(sameGroupSelector);
	var otherNodes = groupParent.querySelectorAll('select,textarea,button,input:not([name="' + escapedName +
		'"]):not([type="hidden"])');

	return groupNodes.length === matchingNodes.length && otherNodes.length === 0;
}

if (parentFieldset) {
	var firstNode = parentFieldset.firstElementChild;
	if (firstNode && firstNode.nodeName === 'LEGEND' &&
		kslib.text.accessibleText(firstNode) && containsProperFormElements(parentFieldset)) {
		return true;
	}
}

if (parentGroup) {
	var l = parentGroup.getAttribute('aria-labelledby');
	var hasLabelledByText = (l ? l.split(/\s+/) : []).reduce(function (prev, curr) {
		var labelNode = node.ownerDocument.getElementById(curr);
		return prev || (labelNode && kslib.text.accessibleText(labelNode));
	}, false);
	var label = parentGroup.getAttribute('aria-label');
	var hasLabel = label && kslib.text.sanitize(label) !== '';
	return !!(hasLabel || hasLabelledByText) && containsProperFormElements(parentGroup);
}

return false;
