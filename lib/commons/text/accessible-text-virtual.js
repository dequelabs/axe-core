/* global text, dom, aria, axe */
/* jshint maxstatements: 27, maxcomplexity: 19 */

var defaultButtonValues = {
	submit: 'Submit',
	reset: 'Reset'
};

var inputTypes = ['text', 'search', 'tel', 'url', 'email', 'date', 'time', 'number', 'range', 'color'];
var phrasingElements = ['A', 'EM', 'STRONG', 'SMALL', 'MARK', 'ABBR', 'DFN', 'I', 'B', 'S', 'U', 'CODE',
	'VAR', 'SAMP', 'KBD', 'SUP', 'SUB', 'Q', 'CITE', 'SPAN', 'BDO', 'BDI', 'BR', 'WBR', 'INS', 'DEL', 'IMG',
	'EMBED', 'OBJECT', 'IFRAME', 'MAP', 'AREA', 'SCRIPT', 'NOSCRIPT', 'RUBY', 'VIDEO', 'AUDIO', 'INPUT',
	'TEXTAREA', 'SELECT', 'BUTTON', 'LABEL', 'OUTPUT', 'DATALIST', 'KEYGEN', 'PROGRESS', 'COMMAND',
	'CANVAS', 'TIME', 'METER'];

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
			elm: 'label', attr: 'for', value: virtualNode.actualNode.id, context: virtualNode.actualNode
		})[0];
	} else {
		label = dom.findUpVirtual(virtualNode, 'label');
	}
	return axe.utils.getNodeFromTree(axe._tree[0], label);
}

function isButton({ actualNode }) {
	return ['button', 'reset', 'submit'].includes(actualNode.type.toLowerCase());
}

function isInput({ actualNode }) {
	var nodeName = actualNode.nodeName.toUpperCase();
	return (nodeName === 'TEXTAREA' || nodeName === 'SELECT') ||
		(nodeName === 'INPUT' && actualNode.type.toLowerCase() !== 'hidden');
}

function shouldCheckSubtree({ actualNode }) {
	return ['BUTTON', 'SUMMARY', 'A'].includes(actualNode.nodeName.toUpperCase());
}

function shouldNeverCheckSubtree({ actualNode }) {
	return ['TABLE', 'FIGURE'].includes(actualNode.nodeName.toUpperCase());
}

/**
 * Calculate value of a form element when treated as a value
 * @private
 * @param {VirtualNode} element The VirtualNode instance whose value we want
 * @return {string} The calculated value
 */
function formValueText({ actualNode }) {
	const nodeName = actualNode.nodeName.toUpperCase();
	if (nodeName === 'INPUT') {
		if (!actualNode.hasAttribute('type') ||
				inputTypes.includes(actualNode.type.toLowerCase())) {
			return actualNode.value;
		}
		return '';
	}

	if (nodeName === 'SELECT') {
		var opts = actualNode.options;
		if (opts && opts.length) {
			var returnText = '';
			for (var i = 0; i < opts.length; i++) {
				if (opts[i].selected) {
					returnText += ' ' + opts[i].text;
				}
			}
			return text.sanitize(returnText);
		}
		return '';
	}

	if (nodeName === 'TEXTAREA' && actualNode.value) {
		return actualNode.value;
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


/**
 * Determine whether an element can be an embedded control
 * @private
 * @param {VirtualNode} element The VirtualNode instance of the element
 * @return {boolean} True if embedded control
 */
function isEmbeddedControl(elm) {
	if (!elm) {
		return false;
	}
	const { actualNode } = elm;
	switch (actualNode.nodeName.toUpperCase()) {
		case 'SELECT':
		case 'TEXTAREA':
			return true;
		case 'INPUT':
			return (!actualNode.hasAttribute('type') ||
					inputTypes.includes(actualNode.getAttribute('type').toLowerCase()));
		default:
			return false;
	}
}

function shouldCheckAlt({ actualNode }) {
	const nodeName = actualNode.nodeName.toUpperCase();
	return ['IMG', 'APPLET', 'AREA'].includes(nodeName) ||
			(nodeName === 'INPUT' && actualNode.type.toLowerCase() === 'image');
}

function nonEmptyText(t) {
	return !!text.sanitize(t);
}

/**
 * Finds virtual node and calls accessibleTextVirtual()
 * IMPORTANT: This method requires the composed tree at axe._tree
 * @method accessibleText
 * @memberof axe.commons.text
 * @instance
 * @param {HTMLElement} element The HTMLElement
 * @param {Boolean} inLabelledByContext True when in the context of resolving a labelledBy
 * @return {string}
 */
text.accessibleText = function accessibleText(element, inLabelledByContext) {
	let virtualNode = axe.utils.getNodeFromTree(axe._tree[0], element); // throws an exception on purpose if axe._tree not correct
	return axe.commons.text.accessibleTextVirtual(virtualNode, inLabelledByContext);
};

/**
 * Determine the accessible text of an element, using logic from ARIA:
 * http://www.w3.org/TR/html-aam-1.0/
 * http://www.w3.org/TR/wai-aria/roles#textalternativecomputation
 * @method accessibleTextVirtual
 * @memberof axe.commons.text
 * @instance
 * @param {VirtualNode} element Virtual Node to search
 * @param {Boolean} inLabelledByContext True when in the context of resolving a labelledBy
 * @return {string}
 */
text.accessibleTextVirtual = function accessibleTextVirtual(element, inLabelledByContext) {
	let accessibleNameComputation;
	const encounteredNodes = [];
	if (element instanceof Node) {
		element = axe.utils.getNodeFromTree(axe._tree[0], element);
	}

	function getInnerText (element, inLabelledByContext, inControlContext) {
		return element.children.reduce((returnText, child) => {
			const { actualNode } = child;
			if (actualNode.nodeType === 3) {
				returnText += actualNode.nodeValue;
			} else if (actualNode.nodeType === 1) {
				if (!phrasingElements.includes(actualNode.nodeName.toUpperCase())) {
					returnText += ' ';
				}
				returnText += accessibleNameComputation(child, inLabelledByContext,
						inControlContext);
			}
			return returnText;
		}, '');
	}

	function getLayoutTableText (element) {
		// // check if layout table only has one cell
		if (!axe.commons.table.isDataTable(element.actualNode) && axe.commons.table.getAllCells(element.actualNode).length === 1) {
			return getInnerText(element, false, false).trim();
		}
		return '';
	}

	function checkNative (element, inLabelledByContext, inControlContext) {
		// jshint maxstatements:30, maxcomplexity: 20
		let returnText = '';
		const { actualNode } = element;
		const nodeName = actualNode.nodeName.toUpperCase();

		if (shouldCheckSubtree(element)) {
			returnText = getInnerText(element, false, false) || '';
			if (nonEmptyText(returnText)) {
				return returnText;
			}
		}
		if (nodeName === 'FIGURE') {
			returnText = checkDescendant(element, 'figcaption');

			if (nonEmptyText(returnText)) {
				return returnText;
			}
		}

		if (nodeName === 'TABLE') {
			returnText = checkDescendant(element, 'caption');

			if (nonEmptyText(returnText)) {
				return returnText;
			}

			returnText = (actualNode.getAttribute('title') ||
					actualNode.getAttribute('summary') || getLayoutTableText(element) || '');

			if (nonEmptyText(returnText)) {
				return returnText;
			}
		}

		if (shouldCheckAlt(element)) {
			return actualNode.getAttribute('alt') || '';
		}

		if (isInput(element) && !inControlContext) {
			if (isButton(element)) {
				return actualNode.value || actualNode.title || defaultButtonValues[actualNode.type] || '';
			}

			var labelElement = findLabel(element);
			if (labelElement) {
				return accessibleNameComputation(labelElement, inLabelledByContext, true);
			}
		}

		return '';
	}

	function checkARIA (element, inLabelledByContext, inControlContext) {
		let returnText = '';
		const { actualNode } = element;
		if (!inLabelledByContext && actualNode.hasAttribute('aria-labelledby')) {
			// Store the return text, if it's empty, fall back to aria-label
			returnText = text.sanitize(dom.idrefs(actualNode, 'aria-labelledby').map(label => {
				if (label !== null) {// handle unfound elements by dom.idref
					if (actualNode === label) {
						encounteredNodes.pop();
					} //let element be encountered twice
					const vLabel = axe.utils.getNodeFromTree(axe._tree[0], label);
					return accessibleNameComputation(vLabel, true, actualNode !== label);
				} else {
					return '';
				}
			}).join(' '));
		}

		if (!returnText && !(inControlContext && isEmbeddedControl(element)) &&
				actualNode.hasAttribute('aria-label')) {
			return text.sanitize(actualNode.getAttribute('aria-label'));
		}

		return returnText;
	}

	/**
	 * Determine the accessible text of an element, using logic from ARIA:
	 * http://www.w3.org/TR/accname-aam-1.1/#mapping_additional_nd_name
	 *
	 * @param {VirtualNode} element The VirtualNode instance of the HTMLElement
	 * @param {Boolean} inLabelledByContext True when in the context of resolving a labelledBy
	 * @param {Boolean} inControlContext True when in the context of textifying a widget
	 * @return {string}
	 */
	accessibleNameComputation = function (element, inLabelledByContext, inControlContext) {
		let returnText;
		// If the node was already checked or is null, skip
		if (!element || encounteredNodes.includes(element)) {
			return '';

		// if the node is invalid, throw
		} else if (element !== null && element.actualNode instanceof Node !== true) {
			throw new Error('Invalid argument. Virtual Node must be provided');

		//Step 2a: Skip if the element is hidden, unless part of labelledby
		} else if(!inLabelledByContext && !dom.isVisible(element.actualNode, true)) {
			return '';
		}

		encounteredNodes.push(element);
		var role = element.actualNode.getAttribute('role');

		//Step 2b & 2c
		returnText = checkARIA(element, inLabelledByContext, inControlContext);
		if (nonEmptyText(returnText)) {
			return returnText;
		}

		//Step 2d - native attribute or elements
		returnText = checkNative(element, inLabelledByContext, inControlContext);
		if (nonEmptyText(returnText)) {
			return returnText;
		}

		//Step 2e
		if (inControlContext) {
			returnText = formValueText(element);
			if (nonEmptyText(returnText)) {
				return returnText;
			}
		}

		//Step 2f
		if (!shouldNeverCheckSubtree(element) &&
					(!role || aria.getRolesWithNameFromContents().indexOf(role) !== -1)) {

			returnText = getInnerText(element, inLabelledByContext, inControlContext);

			if (nonEmptyText(returnText)) {
				return returnText;
			}
		}

		//Step 2g - if text node, return value (handled in getInnerText)

		//Step 2h
		if (element.actualNode.hasAttribute('title')) {
			return element.actualNode.getAttribute('title');
		}

		return '';
	};

	return text.sanitize(accessibleNameComputation(element, inLabelledByContext));
};
