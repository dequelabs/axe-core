/* global window */
var text = commons.text.sanitize(node.textContent);

if (!text) {
	return false;
}
var parentBlock = node;
while (parentBlock.nodeType === 1 && window.getComputedStyle(parentBlock).display !== 'block') {
	parentBlock = parentBlock.parentNode;
}

if (parentBlock.textContent) {
	var parentText = commons.text.sanitize(parentBlock.textContent);
	return (text !== parentText);
} else {
	return false;
}

