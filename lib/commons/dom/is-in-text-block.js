/* global axe, dom, window */

function walkDomNode(node, functor) {
	'use strict';
    var shouldWalk = functor(node);
    node = node.firstChild;
    while (node) {
    	if (shouldWalk !== false) {
        	walkDomNode(node, functor);
    	}
        node = node.nextSibling;
    }
}

var blockLike = ['block', 'list-item', 'table', 'flex', 'grid', 'inline-block'];
function isBlock(elm) {
	'use strict';
	var display = window.getComputedStyle(elm).getPropertyValue('display');
	return (blockLike.indexOf(display) !== -1 ||
			display.substr(0, 6) === 'table-');
}


dom.isInTextBlock = function isInTextBlock(node) {
	// jshint maxcomplexity: 15
	'use strict';
	// Ignore if the link is a block
	if (isBlock(node)) {
		return false;
	}

	// Find the closest parent
	var parentBlock = node.parentNode;
	while (parentBlock.nodeType === 1 && !isBlock(parentBlock)) {
		parentBlock = parentBlock.parentNode;
	}

	// Find all the text part of the parent block not in a link, and all the text in a link
	var parentText = '';
	var linkText = '';
	var inBrBlock = 0;

	// We want to ignore hidden text, and if br / hr is used, only use the section of the parent 
	// that has the link we're looking at
	walkDomNode(parentBlock, function (currNode) {
		// We're already passed it, skip everything else
		if (inBrBlock === 2) {
			return false;
		}

		if (currNode.nodeType === 3) {
			// Add the text to the parent
			parentText += currNode.nodeValue;
		}
		// Ignore any node that's not an element (or text as above)
		if (currNode.nodeType !== 1) {
			return;
		}

		var nodeName = (currNode.nodeName || '').toUpperCase();
		// BR and HR elements break the line
		if (['BR', 'HR'].indexOf(nodeName) !== -1) {
			if (inBrBlock === 0) {
				parentText = '';
				linkText = '';
			} else {
				inBrBlock = 2;
			}

		// Don't walk nodes with content not displayed on screen.
		} else if (currNode.style.display === 'none' ||
				currNode.style.overflow === 'hidden' ||
				['', null, 'none'].indexOf(currNode.style.float) === -1 ||
				['', null, 'relative'].indexOf(currNode.style.position) === -1) {
			return false;

		// Don't walk links, we're only interested in what's not in them.
		} else if ((nodeName === 'A' && currNode.href) ||
				(currNode.getAttribute('role') || '').toLowerCase() === 'link') {
			if (currNode === node) {
				inBrBlock = 1;
			}
			// Grab all the text from this element, but don't walk down it's children
			linkText += currNode.textContent;
			return false;
		}
	});

	parentText = axe.commons.text.sanitize(parentText);
	linkText = axe.commons.text.sanitize(linkText);

	return (parentText.length > linkText.length);
};
