/* global text, aria */
const alwaysTitleElements = [
	'button',
	'iframe',
	'a[href]',
	{
		nodeName: 'input',
		properties: { type: 'button' }
	}
];

text.titleText = function titleText(node) {
	node = node.actualNode || node;
	if (node.nodeType !== 1 || !node.hasAttribute('title')) {
		return '';
	}

	// Some elements return the title even with role=presentation
	// This does appear in any spec, but its remarkably consistent
	if (
		!axe.utils.elementMatch(node, alwaysTitleElements) &&
		['none', 'presentation'].includes(aria.getRole(node))
	) {
		return '';
	}

	return node.getAttribute('title');
};
