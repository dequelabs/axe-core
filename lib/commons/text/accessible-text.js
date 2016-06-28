/*global text, dom, aria, axe */
/*jshint maxstatements: 25, maxcomplexity: 19 */

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
 *
 * @param {HTMLElement} element The HTMLElement
 * @return {HTMLElement} The label element, or null if none is found
 */
function findLabel(element) {
	var ref = null;
	if (element.id) {
		ref = document.querySelector('label[for="' + axe.utils.escapeSelector(element.id) + '"]');
		if (ref) {
			return ref;
		}
	}
	ref = dom.findUp(element, 'label');
	return ref;
}

function isButton(element) {
	return ['button', 'reset', 'submit'].indexOf(element.type) !== -1;
}

function isInput(element) {
	var nodeName = element.nodeName.toUpperCase();
	return (nodeName === 'TEXTAREA' || nodeName === 'SELECT') ||
		(nodeName === 'INPUT' && element.type.toLowerCase() !== 'hidden');
}

function shouldCheckSubtree(element) {
	return ['BUTTON', 'SUMMARY', 'A'].indexOf(element.nodeName.toUpperCase()) !== -1;
}

function shouldNeverCheckSubtree(element) {
	return ['TABLE', 'FIGURE'].indexOf(element.nodeName.toUpperCase()) !== -1;
}

/**
 * Calculate value of a form element when treated as a value
 *
 * @param {HTMLElement} element The HTMLElement
 * @return {string} The calculated value
 */
function formValueText(element) {
	var nodeName = element.nodeName.toUpperCase();
	if (nodeName === 'INPUT') {
		if (!element.hasAttribute('type') || (
				inputTypes.indexOf(element.getAttribute('type').toLowerCase()) !== -1) &&
				element.value) {
			return element.value;
		}
		return '';
	}

	if (nodeName === 'SELECT') {
		var opts = element.options;
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

	if (nodeName === 'TEXTAREA' && element.value) {
		return element.value;
	}
	return '';
}

function checkDescendant(element, nodeName) {
	var candidate = element.querySelector(nodeName.toLowerCase());
	if (candidate) {
		return text.accessibleText(candidate);
	}

	return '';
}


/**
 * Determine whether an element can be an embedded control
 *
 * @param {HTMLElement} element The HTMLElement
 * @return {boolean} True if embedded control
 */
function isEmbeddedControl(e) {
	if (!e) {
		return false;
	}
	switch (e.nodeName.toUpperCase()) {
		case 'SELECT':
		case 'TEXTAREA':
			return true;
		case 'INPUT':
			return !e.hasAttribute('type') || (inputTypes.indexOf(e.getAttribute('type').toLowerCase()) !== -1);
		default:
			return false;
	}
}

function shouldCheckAlt(element) {
	var nodeName = element.nodeName.toUpperCase();
	return (nodeName === 'INPUT' && element.type.toLowerCase() === 'image') ||
		['IMG', 'APPLET', 'AREA'].indexOf(nodeName) !== -1;
}

function nonEmptyText(t) {
	return !!text.sanitize(t);
}

/**
 * Determine the accessible text of an element, using logic from ARIA:
 * http://www.w3.org/TR/html-aam-1.0/
 * http://www.w3.org/TR/wai-aria/roles#textalternativecomputation
 *
 * @param {HTMLElement} element The HTMLElement
 * @param {Boolean} inLabelledByContext True when in the context of resolving a labelledBy
 * @return {string}
 */
text.accessibleText = function(element, inLabelledByContext) {
	var accessibleNameComputation;
	var encounteredNodes = [];

	function getInnerText (element, inLabelledByContext, inControlContext) {
		var nodes = element.childNodes;
		var returnText = '';
		var node;

		for (var i = 0; i < nodes.length; i++) {
			node = nodes[i];
			if (node.nodeType === 3) {
				returnText += node.textContent;
			} else if (node.nodeType === 1) {
				if (phrasingElements.indexOf(node.nodeName.toUpperCase()) === -1) {
					returnText += ' ';
				}
				returnText += accessibleNameComputation(nodes[i], inLabelledByContext, inControlContext);
			}
		}

		return returnText;
	}

	function checkNative (element, inLabelledByContext, inControlContext) {
		// jshint maxstatements:30
		var returnText = '';
		var nodeName = element.nodeName.toUpperCase();

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

			returnText = element.getAttribute('title') || element.getAttribute('summary') || '';

			if (nonEmptyText(returnText)) {
				return returnText;
			}
		}

		if (shouldCheckAlt(element)) {
			return element.getAttribute('alt') || '';
		}

		if (isInput(element) && !inControlContext) {
			if (isButton(element)) {
				return element.value || element.title || defaultButtonValues[element.type] || '';
			}

			var labelElement = findLabel(element);
			if (labelElement) {
				return accessibleNameComputation(labelElement, inLabelledByContext, true);
			}
		}

		return '';
	}

	function checkARIA (element, inLabelledByContext, inControlContext) {

		if (!inLabelledByContext && element.hasAttribute('aria-labelledby')) {
			return text.sanitize(dom.idrefs(element, 'aria-labelledby').map(function(l) {
				if (element === l) {
					encounteredNodes.pop();
				} //let element be encountered twice
				return accessibleNameComputation(l, true, element !== l);
			}).join(' '));
		}

		if (!(inControlContext && isEmbeddedControl(element)) && element.hasAttribute('aria-label')) {
			return text.sanitize(element.getAttribute('aria-label'));
		}

		return '';
	}

	/**
	 * Determine the accessible text of an element, using logic from ARIA:
	 * http://www.w3.org/TR/accname-aam-1.1/#mapping_additional_nd_name
	 *
	 * @param {HTMLElement} element The HTMLElement
	 * @param {Boolean} inLabelledByContext True when in the context of resolving a labelledBy
	 * @param {Boolean} inControlContext True when in the context of textifying a widget
	 * @return {string}
	 */
	accessibleNameComputation = function (element, inLabelledByContext, inControlContext) {
		'use strict';

		var returnText;
		// If the node was already checked or is null, skip
		if (element === null || (encounteredNodes.indexOf(element) !== -1)) {
			return '';

		//Step 2a: Skip if the element is hidden, unless part of labelledby
		} else if(!inLabelledByContext && !dom.isVisible(element, true)) {
			return '';
		}

		encounteredNodes.push(element);
		var role = element.getAttribute('role');

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
		if (!shouldNeverCheckSubtree(element) && (!role || aria.getRolesWithNameFromContents().indexOf(role) !== -1)) {

			returnText = getInnerText(element, inLabelledByContext, inControlContext);

			if (nonEmptyText(returnText)) {
				return returnText;
			}
		}

		//Step 2g - if text node, return value (handled in getInnerText)

		//Step 2h
		if (element.hasAttribute('title')) {
			return element.getAttribute('title');
		}

		return '';
	};

	return text.sanitize(accessibleNameComputation(element, inLabelledByContext));
};
