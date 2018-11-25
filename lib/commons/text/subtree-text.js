/* global text, aria */

const phrasingElements = [
	'A',
	'EM',
	'STRONG',
	'SMALL',
	'MARK',
	'ABBR',
	'DFN',
	'I',
	'B',
	'S',
	'U',
	'CODE',
	'VAR',
	'SAMP',
	'KBD',
	'SUP',
	'SUB',
	'Q',
	'CITE',
	'SPAN',
	'BDO',
	'BDI',
	'WBR',
	'INS',
	'DEL',
	'MAP',
	'AREA',
	'NOSCRIPT',
	'RUBY',
	'BUTTON',
	'LABEL',
	'OUTPUT',
	'DATALIST',
	'KEYGEN',
	'PROGRESS',
	'COMMAND',
	'CANVAS',
	'TIME',
	'METER',
	'#TEXT'
];

/**
 * Get the accessible text for an element that can get its name from content
 *
 * @param {VirtualNode} element
 * @param {Object} context
 * @property {Bool} strict Should the name computation strictly follow AccName 1.1
 * @return {String} Accessible text
 */
text.subtreeText = function subtreeText(virtualNode, context) {
	context.processed = context.processed || [];
	const { processed, strict } = context;

	if (
		!aria.namedFromContents(virtualNode, { strict }) ||
		context.processed.includes(virtualNode)
	) {
		return '';
	}

	processed.push(virtualNode);
	const ownedElements = aria.getOwnedVirtual(virtualNode);

	const textContent = ownedElements.reduce((textContent, child) => {
		const nodeName = child.actualNode.nodeName.toUpperCase();
		if (['OPTION', 'OPTGROUP'].includes(nodeName)) {
			return textContent;
		}

		let textContentAdd = text.accessibleTextVirtual(child, context);
		if (!phrasingElements.includes(nodeName.toUpperCase())) {
			// Prepend space, if necessary
			if (textContent) {
				textContent += ' ';
			}
			// Append space, if necessary
			if (textContentAdd) {
				textContentAdd += ' ';
			}
		}
		return textContent + textContentAdd;
	}, '');

	return textContent;
};
