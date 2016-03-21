/* global window */
var text = axe.commons.text.sanitize(node.textContent);

if (!text) {
	return false;
}

var blockLike = ['block', 'list-item', 'table', 'flex', 'grid'];
function isBlock(elm) {
	var display = window.getComputedStyle(elm).getPropertyValue('display');
	return (blockLike.indexOf(display) !== -1 ||
			display.substr(0, 6) === 'table-');
}

var parentBlock = node;
while (parentBlock.nodeType === 1 && !isBlock(parentBlock)) {
	parentBlock = parentBlock.parentNode;
}


if (parentBlock.textContent) {
	var parentText = axe.commons.text.sanitize(parentBlock.textContent);
	return (text !== parentText);
} else {
	return false;
}
