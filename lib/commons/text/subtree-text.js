import accessibleTextVirtual from './accessible-text-virtual';
import namedFromContents from '../aria/named-from-contents';
import getOwnedVirtual from '../aria/get-owned-virtual';

/**
 * Get the accessible text for an element that can get its name from content
 *
 * @param {VirtualNode} element
 * @param {Object} context
 * @property {Bool} strict Should the name computation strictly follow AccName 1.1
 * @return {String} Accessible text
 */
function subtreeText(virtualNode, context = {}) {
	const { alreadyProcessed } = accessibleTextVirtual;
	context.startNode = context.startNode || virtualNode;
	const { strict } = context;
	if (
		alreadyProcessed(virtualNode, context) ||
		!namedFromContents(virtualNode, { strict })
	) {
		return '';
	}

	return getOwnedVirtual(virtualNode).reduce((contentText, child) => {
		return appendAccessibleText(contentText, child, context);
	}, '');
}

// TODO: Could do with an "HTML" lookup table, similar to ARIA,
//  where this sort of stuff can live.
const phrasingElements = [
	'#text',
	'a',
	'abbr',
	'area',
	'b',
	'bdi',
	'bdo',
	'button',
	'canvas',
	'cite',
	'code',
	'command',
	'datalist',
	'del',
	'dfn',
	'em',
	'i',
	'ins',
	'kbd',
	'keygen',
	'label',
	'map',
	'mark',
	'meter',
	'noscript',
	'output',
	'progress',
	'q',
	'ruby',
	's',
	'samp',
	'small',
	'span',
	'strong',
	'sub',
	'sup',
	'time',
	'u',
	'var',
	'wbr'
];

function appendAccessibleText(contentText, virtualNode, context) {
	const nodeName = virtualNode.props.nodeName;
	let contentTextAdd = accessibleTextVirtual(virtualNode, context);
	if (!contentTextAdd) {
		return contentText;
	}

	if (!phrasingElements.includes(nodeName)) {
		// Append space, if necessary
		if (contentTextAdd[0] !== ' ') {
			contentTextAdd += ' ';
		}
		// Prepend space, if necessary
		if (contentText && contentText[contentText.length - 1] !== ' ') {
			contentTextAdd = ' ' + contentTextAdd;
		}
	}
	return contentText + contentTextAdd;
}

export default subtreeText;
