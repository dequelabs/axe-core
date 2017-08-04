const text = axe.commons.text.visibleVirtual(virtualNode, true).toLowerCase();
if (text === '') {
	return false;
}

// Get all visible images in the composed tree of the current node
const images = axe.utils.querySelectorAll(virtualNode, 'img')
	// Ignore hidden or role=none/presentation images
	.filter(({ actualNode }) => (axe.commons.dom.isVisible(actualNode) && 
		!['none', 'presentation'].includes(actualNode.getAttribute('role'))
	));

// See if any of the images duplicate the node's text
return images.some(img =>
	text === axe.commons.text.accessibleTextVirtual(img).toLowerCase()
);
