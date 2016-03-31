/* global window, document */
var text = axe.commons.text.sanitize(node.textContent);

if (!text) {
	return false;
}
if (!axe.commons.dom.isVisible(node, false)) {
	return false;
}

var blockLike = ['block', 'list-item', 'table', 'flex', 'grid', 'inline-block'];
function isBlock(elm) {
	var display = window.getComputedStyle(elm).getPropertyValue('display');
	return (blockLike.indexOf(display) !== -1 ||
			display.substr(0, 6) === 'table-');
}

if (isBlock(node)) {
	return false;
}

var parentBlock = node.parentNode;
while (parentBlock.nodeType === 1 && !isBlock(parentBlock)) {
	parentBlock = parentBlock.parentNode;
}

var parentText; // If there is no br, take the entire text
if (parentBlock.innerHTML.match(/<[bh]r/i) === null) {
	parentText = parentBlock.textContent;

} else {
	// if there is a br, split the text into blocks
	var subBlocks = parentBlock.innerHTML.split(/<[bh]r[^>]*>/gi);
	var tempNode = document.createElement('div');
	// find the block in which the current link exists
	tempNode.innerHTML = subBlocks.reduce(function (found, subBlock) {
		if (!found && subBlock.indexOf(node.outerHTML) !== -1) {
			return subBlock;

		} else {
			return found;
		}
	}, '');

	// set the parent text to only that of the <br> / <hr> group it's in
	parentText = tempNode.textContent;
}

var linkText = '';
var links = axe.utils.toArray(parentBlock.querySelectorAll('a[href]:not([role]), *[role=link]'));

links.forEach(function(link) {
	linkText += ' ' + link.textContent;
	parentText = parentText.replace(link.textContent, '');
});

parentText = axe.commons.text.sanitize(parentText);
linkText = axe.commons.text.sanitize(linkText);


return (parentText.length > linkText.length);
