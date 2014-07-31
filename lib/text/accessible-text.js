/*global text, dom, aria, utils */
/*jshint maxstatements: 35, maxcomplexity: 16 */

var inputTypes = ['text', 'search', 'tel', 'url', 'email', 'date', 'time', 'number', 'range', 'color'];

/**
 * Find a non-ARIA label for an element
 *
 * @param {HTMLElement} element The HTMLElement
 * @return {HTMLElement} The label element, or null if none is found 
 */
var findLabel = function (element) {
	var ref = null;
	if (element.id) {
		ref = element.ownerDocument.querySelector('label[for="' + utils.escapeSelector(element.id) + '"]');
		if (ref) { return ref; }
	}
	ref = dom.findUp(element, 'label');
	return ref;
};

/**
 * Calculate value of a form element when treated as a value
 *
 * @param {HTMLElement} element The HTMLElement
 * @return {string} The calculated value
 */
var formValueText = function (element) {
	if (element.tagName === 'INPUT') {
		if (!element.hasAttribute('type') || (inputTypes.indexOf(element.getAttribute('type')) !== -1) && element.value) {
			return element.value;
		}
		return '';
	}

	if (element.tagName === 'SELECT') {
		var opts = element.options;
		if (opts && opts.length) {
			var returnText = '';
			for (var i = 0; i < opts.length; i++) {
				if (opts[i].selected) { returnText += ' ' + opts[i].text; }
			}
			return text.sanitize(returnText);
		}
		return '';
	}

	if (element.tagName === 'TEXTAREA' && element.value) {
		return element.value;
	}
	return '';
};

/**
 * Determine whether an element can be an embedded control
 *
 * @param {HTMLElement} element The HTMLElement
 * @return {boolean} True if embedded control
 */
var isEmbeddedControl = function (e) {
	if (!e) { return false; }
	switch (e.tagName) {
		case 'SELECT':
		case 'TEXTAREA':
			return true;
		case 'INPUT':
			return !e.hasAttribute('type') || (inputTypes.indexOf(e.getAttribute('type')) !== -1);
		default:
			return false;
	}
};
/**
 * Determine the accessible text of an element, using logic from ARIA: 
 * http://www.w3.org/TR/wai-aria/roles#textalternativecomputation
 *
 * @param {HTMLElement} element The HTMLElement
 * @return {string} 
 */
text.accessibleText = function (element) {

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
	var getAccessibleText = function (element, inLabelledByContext, inControlContext) {
		'use strict';

		var returnText	= '';

		//Step 1
		if (element === null || !dom.isVisible(element, true) || (encounteredNodes.indexOf(element) !== -1)) { return ''; }
		encounteredNodes.push(element);

		//Step 2a
		if (!inLabelledByContext && element.hasAttribute('aria-labelledby')) {
			returnText += ' ' + dom.idrefs(element, 'aria-labelledby').map(function (l) {
				if (element === l) { encounteredNodes.pop(); } //let element be encountered twice
				return getAccessibleText(l, true, element !== l);
			}).join(' ');
		} else if (!(inControlContext && isEmbeddedControl(element)) && element.hasAttribute('aria-label')) {
			returnText += ' ' + text.sanitize(element.getAttribute('aria-label'));
		} else if (!(inControlContext && isEmbeddedControl(element)) && element.getAttribute('role') !== 'presentation') {
			if (((element.tagName === 'INPUT' && element.getAttribute('type') === 'image') ||
				['IMG', 'AREA', 'APPLET'].indexOf(element.tagName) !== -1) && element.hasAttribute('alt')) {
				returnText += ' ' + text.sanitize(element.getAttribute('alt'));
			}

			var labelElement = findLabel(element);
			returnText += getAccessibleText(labelElement, inLabelledByContext, true);
		}

		//Step 2b
		if (inControlContext) {
			returnText += ' ' + formValueText(element);
		}

		//Step 2c
		returnText = text.sanitize(returnText);
		if (returnText !== '') { return returnText; }

		if (element.hasAttribute('role') &&
			aria.getRolesWithNameFromContents().indexOf(element.getAttribute('role')) === -1) {
			return returnText;
		}

		var nodes = element.childNodes;

		for (var i = 0; i < nodes.length; i++) {
			if (nodes[i].nodeType === 3) {
				returnText += ' ' + text.sanitize(nodes[i].textContent);
			} else if (nodes[i].nodeType === 1) {
				returnText += ' ' + getAccessibleText(nodes[i], inLabelledByContext, inControlContext);
			}
			returnText = text.sanitize(returnText);
		}

		if (returnText !== '') { return returnText; }

		//Step 2d
		if (element.hasAttribute('title')) { return text.sanitize(element.getAttribute('title')); }

		return '';
	};

	return getAccessibleText(element);
};
