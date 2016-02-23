/* global commons*/

var parentBlock = node;
while (parentBlock.nodeType === 1 &&
window.getComputedStyle(parentBlock).display !== 'block') {
	parentBlock = parentBlock.parentNode;
}

var elementIsDistinct = commons.color.elementIsDistinct;

return elementIsDistinct(node, parentBlock);