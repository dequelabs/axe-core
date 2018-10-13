/* global text, dom, aria */

text.nativeTextMethods = {
	labelText,
	valueText,
	buttonDefaultText,
	tableCaptionText,
	titleText,
	altText,
	figureText,
	subtreeText,
	fieldsetLegendText,
	tableSummaryText
};
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

function labelText(virtualNode, context) {
	// Strictly speaking, aria labels and native labels should be
	// considered seperately. Chrome 70 and Firefox 62 don't do this though.
	if (
		context.inControlContext ||
		(!context.strict && context.inLabelledByContext)
	) {
		return '';
	}
	const labelContext = { inControlContext: true, ...context };
	const explicitLabels = getExplicitLabels(virtualNode);
	const implicitLabel = dom.findUpVirtual(virtualNode, 'label');

	let labels;
	if (implicitLabel) {
		labels = [...explicitLabels, implicitLabel];
		labels.sort(axe.utils.nodeSorter);
	} else {
		labels = explicitLabels;
	}

	return labels
		.map(label => text.accessibleText(label, labelContext))
		.filter(text => text !== '')
		.join(' ');
}

function valueText({ actualNode }) {
	return actualNode.value || '';
}

function buttonDefaultText({ actualNode }) {
	const defaultButtonValues = {
		submit: 'Submit',
		image: 'Submit Query',
		reset: 'Reset'
	};
	return defaultButtonValues[actualNode.type] || '';
}

function tableCaptionText(virtualNode, context) {
	return checkDescendant(virtualNode, context, 'caption');
}

function titleText(virtualNode, context) {
	return text.titleText(virtualNode, context);
}

function altText({ actualNode }) {
	return actualNode.getAttribute('alt') || '';
}

function figureText(virtualNode, context) {
	return checkDescendant(virtualNode, context, 'figcaption');
}

function subtreeText(virtualNode, context) {
	if (!context.processed) {
		context.processed = [virtualNode];
	} else if (!context.processed.includes(virtualNode)) {
		context.processed.push(virtualNode);
	} else {
		return '';
	}
	const owneElements = aria.getOwnedVirtual(virtualNode);

	const textContent = owneElements.reduce((textContent, child) => {
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
}

function fieldsetLegendText(virtualNode, context) {
	return checkDescendant(virtualNode, context, 'legend');
}

/**
 * Get the accessible text of first matching node
 * IMPORTANT: This method does not look at the composed tree
 * @private
 */
function checkDescendant({ actualNode }, context, nodeName) {
	nodeName = nodeName.toLowerCase();
	// Prevent accidently getting the nested element, like:
	// fieldset > fielset > legend (1st fieldset has no legend)
	const nodeNames = [nodeName, actualNode.nodeName.toLowerCase()].join(',');
	var candidate = actualNode.querySelector(nodeNames);

	if (candidate && candidate.nodeName.toLowerCase() === nodeName) {
		return text.accessibleText(candidate, context);
	}
	return '';
}

/**
 * Find a non-ARIA label for an element
 * @private
 * @param {VirtualNode} element The VirtualNode instance whose label we are seeking
 * @return {HTMLElement} The label element, or null if none is found
 */
function getExplicitLabels({ actualNode }) {
	if (!actualNode.id) {
		return [];
	}
	return dom.findElmsInContext({
		elm: 'label',
		attr: 'for',
		value: actualNode.id,
		context: actualNode
	});
}

function tableSummaryText({ actualNode }) {
	return (actualNode && actualNode.getAttribute('summary')) || '';
}
