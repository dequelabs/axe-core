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

text.subtreeText = function subtreeText(virtualNode, context) {
	if (!context.processed) {
		context.processed = [virtualNode];
	} else if (!context.processed.includes(virtualNode)) {
		context.processed.push(virtualNode);
	} else {
		return '';
	}
	const ownedElements = aria.getOwnedVirtual(virtualNode);

	const textContent = ownedElements.reduce((textContent, child) => {
		const nodeName = child.actualNode.nodeName.toUpperCase();
		if (['OPTION', 'OPTGROUP'].includes(nodeName)) {
			return textContent;
		}

		let textContentAdd = text.accessibleTextVirtual(child, context);
		if (!phrasingElements.includes(nodeName.toUpperCase())) {
			const seperator = ' ';
			if (textContent) {
				textContent += seperator;
			}
			if (textContentAdd) {
				textContentAdd += seperator;
			}
		}
		return textContent + textContentAdd;
	}, '');
	return textContent;
};
