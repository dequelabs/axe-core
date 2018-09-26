/* global text, dom */
var defaultButtonValues = {
	submit: 'Submit',
	reset: 'Reset'
};

var phrasingElements = [
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
	'BR',
	'WBR',
	'INS',
	'DEL',
	'IMG',
	'EMBED',
	'OBJECT',
	'IFRAME',
	'MAP',
	'AREA',
	'SCRIPT',
	'NOSCRIPT',
	'RUBY',
	'VIDEO',
	'AUDIO',
	'INPUT',
	'TEXTAREA',
	'SELECT',
	'BUTTON',
	'LABEL',
	'OUTPUT',
	'DATALIST',
	'KEYGEN',
	'PROGRESS',
	'COMMAND',
	'CANVAS',
	'TIME',
	'METER'
];

text.nativeTextAlternative = function nativeTextAlternative(
	virtualNode,
	context
) {
	/* eslint max-statements:["error",30], complexity: ["error",25] */
	const { inControlContext, inLabelledByContext } = context;
	let returnText = '';
	const { actualNode } = virtualNode;
	const nodeName = actualNode.nodeName.toUpperCase();

	if (shouldCheckSubtree(virtualNode)) {
		returnText = getInnerText(virtualNode, false, false) || '';
		if (nonEmptyText(returnText)) {
			return returnText;
		}
	}
	if (nodeName === 'FIGURE') {
		returnText =
			checkDescendant(virtualNode, 'figcaption') ||
			actualNode.getAttribute('title') ||
			'';

		if (nonEmptyText(returnText)) {
			return returnText;
		}
	}

	if (nodeName === 'TABLE') {
		returnText = checkDescendant(virtualNode, 'caption');
		if (nonEmptyText(returnText)) {
			return returnText;
		}

		returnText =
			actualNode.getAttribute('title') ||
			actualNode.getAttribute('summary') ||
			getLayoutTableText(virtualNode) ||
			'';

		if (nonEmptyText(returnText)) {
			return returnText;
		}
	}

	if (shouldCheckAlt(virtualNode)) {
		return actualNode.getAttribute('alt') || '';
	}

	if (isInput(virtualNode) && !inControlContext && !inLabelledByContext) {
		if (isButton(virtualNode)) {
			return (
				actualNode.value ||
				actualNode.title ||
				defaultButtonValues[actualNode.type] ||
				''
			);
		}

		var labelElement = findLabel(virtualNode);
		if (labelElement) {
			return text.accessibleTextVirtual(labelElement, {
				inControlContext: true,
				...context
			});
		}
	}
	return '';
};

function isButton({ actualNode }) {
	return ['button', 'reset', 'submit'].includes(actualNode.type.toLowerCase());
}

function isInput({ actualNode }) {
	var nodeName = actualNode.nodeName.toUpperCase();
	return (
		nodeName === 'TEXTAREA' ||
		nodeName === 'SELECT' ||
		(nodeName === 'INPUT' && actualNode.type.toLowerCase() !== 'hidden')
	);
}

function shouldCheckSubtree({ actualNode }) {
	return ['BUTTON', 'SUMMARY', 'A'].includes(actualNode.nodeName.toUpperCase());
}

function getLayoutTableText(element) {
	// // check if layout table only has one cell
	if (
		!axe.commons.table.isDataTable(element.actualNode) &&
		axe.commons.table.getAllCells(element.actualNode).length === 1
	) {
		return getInnerText(element, false, false).trim();
	}
	return '';
}

/**
 * Get the accessible text of first matching node
 * IMPORTANT: This method does not look at the composed tree
 * @private
 */
function checkDescendant({ actualNode }, nodeName) {
	var candidate = actualNode.querySelector(nodeName.toLowerCase());
	if (candidate) {
		return text.accessibleText(candidate);
	}
	return '';
}

function shouldCheckAlt({ actualNode }) {
	const nodeName = actualNode.nodeName.toUpperCase();
	return (
		['IMG', 'APPLET', 'AREA'].includes(nodeName) ||
		(nodeName === 'INPUT' && actualNode.type.toLowerCase() === 'image')
	);
}

function nonEmptyText(t) {
	return !!text.sanitize(t);
}

function getInnerText(element, inLabelledByContext, inControlContext) {
	return element.children.reduce((returnText, child) => {
		const { actualNode } = child;
		if (actualNode.nodeType === 3) {
			returnText += actualNode.nodeValue;
		} else if (actualNode.nodeType === 1) {
			if (!phrasingElements.includes(actualNode.nodeName.toUpperCase())) {
				returnText += ' ';
			}
			returnText += text.accessibleTextVirtual(
				child,
				inLabelledByContext,
				inControlContext
			);
		}
		return returnText;
	}, '');
}

/**
 * Find a non-ARIA label for an element
 * @private
 * @param {VirtualNode} element The VirtualNode instance whose label we are seeking
 * @return {HTMLElement} The label element, or null if none is found
 */
function findLabel(virtualNode) {
	let label;
	if (virtualNode.actualNode.id) {
		label = dom.findElmsInContext({
			elm: 'label',
			attr: 'for',
			value: virtualNode.actualNode.id,
			context: virtualNode.actualNode
		})[0];
	}
	if (!label) {
		label = dom.findUpVirtual(virtualNode, 'label');
	}
	return axe.utils.getNodeFromTree(axe._tree[0], label);
}
