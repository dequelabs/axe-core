import matches from '../matches/matches';
import getRole from '../aria/get-role';

const alwaysTitleElements = [
	'button',
	'iframe',
	'a[href]',
	{
		nodeName: 'input',
		properties: { type: 'button' }
	}
];

/**
 * Get title text
 * @param {HTMLElement}node the node to verify
 * @return {String}
 */
function titleText(node) {
	node = node.actualNode || node;
	if (node.nodeType !== 1 || !node.hasAttribute('title')) {
		return '';
	}

	// Some elements return the title even with role=presentation
	// This does appear in any spec, but its remarkably consistent
	if (
		!matches(node, alwaysTitleElements) &&
		['none', 'presentation'].includes(getRole(node))
	) {
		return '';
	}

	return node.getAttribute('title');
}

export default titleText;
