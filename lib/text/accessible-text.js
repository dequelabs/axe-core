/*global text, dom, aria, utils */

var inputTypes = ['text', 'search', 'tel', 'url', 'email', 'date', 'time', 'number', 'range', 'color'];

/**
 * Find a non-ARIA label for an element
 *
 * @param {HTMLElement} element The HTMLElement
 * @return {HTMLElement} The label element, or null if none is found
 */
function findLabel(element) {
	var ref = null;
	if (element.id) {
		ref = element.ownerDocument.querySelector('label[for="' + utils.escapeSelector(element.id) + '"]');
		if (ref) {
			return ref;
		}
	}
	ref = dom.findUp(element, 'label');
	return ref;
}

function usesARIA(element) {
	return element.hasAttribute('aria-label') || element.hasAttribute('aria-labelledby');
}

function shouldCheckSubtree(element) {
	var nodeNames = ['BUTTON', 'SUMMARY', 'A'];
	return nodeNames.indexOf(element.nodeName) !== -1;
}

/**
 * Calculate value of a form element when treated as a value
 *
 * @param {HTMLElement} element The HTMLElement
 * @return {string} The calculated value
 */
function formValueText(element) {
	if (element.nodeName === 'INPUT') {
		if (!element.hasAttribute('type') || (inputTypes.indexOf(element.getAttribute('type')) !== -1) && element.value) {
			return element.value;
		}
		return '';
	}

	if (element.nodeName === 'SELECT') {
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

	if (element.nodeName === 'TEXTAREA' && element.value) {
		return element.value;
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
	switch (e.nodeName) {
		case 'SELECT':
		case 'TEXTAREA':
			return true;
		case 'INPUT':
			return !e.hasAttribute('type') || (inputTypes.indexOf(e.getAttribute('type')) !== -1);
		default:
			return false;
	}
}

/**
 * Determine the accessible text of an element, using logic from ARIA:
 * http://www.w3.org/TR/html-aam-1.0/
 * http://www.w3.org/TR/wai-aria/roles#textalternativecomputation
 *
 * @param {HTMLElement} element The HTMLElement
 * @return {string}
 */
text.accessibleText = function(element) {

	function getInnerText(element, inLabelledByContext, inControlContext) {

		var nodes = element.childNodes;
		var returnText = '';

		for (var i = 0; i < nodes.length; i++) {
			if (nodes[i].nodeType === 3) {
				returnText += ' ' + text.sanitize(nodes[i].textContent);
			} else if (nodes[i].nodeType === 1) {
				returnText += ' ' + accessibleNameComputation(nodes[i], inLabelledByContext, inControlContext);
			}
			returnText = text.sanitize(returnText);
		}

		return returnText;

	}

	function checkARIA(element, inLabelledByContext, inControlContext) {
		var returnText = '';

		var role = element.getAttribute('role');
		if (!inLabelledByContext && element.hasAttribute('aria-labelledby')) {
			returnText += ' ' + dom.idrefs(element, 'aria-labelledby').map(function(l) {
				if (element === l) {
					encounteredNodes.pop();
				} //let element be encountered twice
				return accessibleNameComputation(l, true, element !== l);
			}).join(' ');
		} else if (!(inControlContext && isEmbeddedControl(element)) && element.hasAttribute('aria-label')) {
			returnText += ' ' + text.sanitize(element.getAttribute('aria-label'));
		} else if (!(inControlContext && isEmbeddedControl(element)) && role !== 'presentation') {
			if (((element.nodeName === 'INPUT' && element.getAttribute('type') === 'image') ||
				['IMG', 'AREA', 'APPLET'].indexOf(element.nodeName) !== -1) && element.hasAttribute('alt')) {
				returnText += ' ' + text.sanitize(element.getAttribute('alt'));
			}

			var labelElement = findLabel(element);
			returnText += accessibleNameComputation(labelElement, inLabelledByContext, true);
		}

		return returnText;
	}

	var encounteredNodes = [];

	/**
	 * Determine the accessible text of an element, using logic from ARIA:
	 * http://www.w3.org/TR/wai-aria/roles#textalternativecomputation
	 *
	 * @param {HTMLElement} element The HTMLElement
	 * @param {Boolean} inLabelledByContext True when in the context of resolving a labelledBy
	 * @param {Boolean} inControlContext True when in the context of textifying a widget
	 * @return {string}
	 */
	function accessibleNameComputation(element, inLabelledByContext, inControlContext) {
		'use strict';

		var returnText = '';

		//Step 1
		if (element === null || !dom.isVisible(element, true) || (encounteredNodes.indexOf(element) !== -1)) {
			return '';
		}
		encounteredNodes.push(element);
		var role = element.getAttribute('role');

		//Step 2a
		returnText += checkARIA(element, inLabelledByContext, inControlContext);

		//Step 2b
		if (inControlContext) {
			returnText += ' ' + formValueText(element);
		}

		//Step 2c
		returnText = text.sanitize(returnText);
		if (returnText !== '') {
			return returnText;
		}

		if (!role || aria.getRolesWithNameFromContents().indexOf(role) !== -1) {

			returnText = getInnerText(element, inLabelledByContext, inControlContext);

			if (returnText !== '') {
				return returnText;
			}
		}

		//Step 2d
		if (element.hasAttribute('title')) {
			return text.sanitize(element.getAttribute('title'));
		}

		return '';
	}

	var candidate;
	// @see http://www.w3.org/TR/html-aam-1.0/#accessible-name-and-description-calculation
	if (!usesARIA(element)) {
		if (shouldCheckSubtree(element)) {
			candidate = text.sanitize(getInnerText(element, false, false) || '');
			if (candidate) {
				return candidate;
			}
		} else if (element.nodeName === 'FIGURE') {
			var figcaption = element.querySelector('figcaption');
			candidate = figcaption && text.sanitize(getInnerText(figcaption, false, false) || '');

			return candidate || element.getAttribute('title') || '';
		}
	}

	return accessibleNameComputation(element);
};
