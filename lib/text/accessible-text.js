/*global text, dom, aria */
/*jshint maxstatements: 35, maxcomplexity: 15 */

text.inputTypes = ['text', 'search', 'tel', 'url', 'email', 'date', 'time', 'number', 'range', 'color'];

/**
 * Calculate value of a form element when treated as a value
 *
 * @param {HTMLElement} element The HTMLElement
 * @return {string} The calculated value
 */
text.formValueText = function (element) {
	if (element.tagName === 'INPUT') {
		if (!element.hasAttribute('type') || (text.inputTypes.indexOf(element.getAttribute('type')) !== -1) && element.value) {
			return ' ' + element.value;
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
			return returnText;
		}
		return '';
	}

	if (element.tagName === 'TEXTAREA' && element.value) {
		return ' ' + element.value;
	}
	return '';
};

/**
 * Determine whether an element can be an embedded control
 *
 * @param {HTMLElement} element The HTMLElement
 * @return {boolean} True if embedded control
 */
text.isEmbeddedControl = function (e) {
	if (!e) { return false; }
	switch (e.tagName) {
		case 'SELECT':
		case 'TEXTAREA':
			return true;
		case 'INPUT':
			return !e.hasAttribute('type') || (text.inputTypes.indexOf(e.getAttribute('type')) !== -1);
		default:
			return false;
	}
};

/**
 * Determine the accessible text of an element, using logic from ARIA: 
 * http://www.w3.org/TR/wai-aria/roles#textalternativecomputation
 *
 * @param {HTMLElement} element The HTMLElement
 * @param {Boolean} inLabelledByContext True when in the context of resolving a labelledBy
 * @param {Boolean} inControlContext True when in the context of textifying a widget
 * @return {string} 
 */
text.accessibleText = function (element, inLabelledByContext, inControlContext) {
	'use strict';

	var returnText	= '',
		hasLabelText = false;

	//Step 1
	if (element === null || !dom.isVisible(element, true)) { return ''; }

	//Step 2a
	if (!inLabelledByContext && element.hasAttribute('aria-labelledby')) {
		var labelrefs = dom.idrefs(element, 'aria-labelledby');
		returnText += ' ' + labelrefs.map(function (l) {
			return text.accessibleText(l, true, element !== l);
		}).join(' ');
		hasLabelText = true;
	}
	if (!hasLabelText && !(inControlContext && text.isEmbeddedControl(element)) && element.hasAttribute('aria-label')) {
		returnText += ' ' + text.sanitize(element.getAttribute('aria-label'));
		hasLabelText = true;
	}
	if (!hasLabelText && !(inControlContext && text.isEmbeddedControl(element)) && element.getAttribute('role') !== 'presentation') {
		if (['IMG', 'AREA', 'APPLET', 'INPUT'].indexOf(element.tagName) !== -1 &&
			element.hasAttribute('alt')) {
			returnText += ' ' + text.sanitize(element.getAttribute('alt'));
		}

		var labelElement = dom.findLabel(element);
		returnText += text.accessibleText(labelElement, inLabelledByContext, true);
	}

	//Step 2b
	if (inControlContext) {
		returnText += text.formValueText(element);
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
			returnText += ' ' + text.accessibleText(nodes[i], inLabelledByContext, inControlContext);
		}
		returnText = text.sanitize(returnText);
	}

	if (returnText !== '') { return returnText; }

	//Step 2d
	if (element.hasAttribute('title')) { return text.sanitize(element.getAttribute('title')); }

	return '';
};
