/*global text, dom, utils, aria */
/*jshint maxstatements: 50, maxcomplexity: 50 */
/**
 * Determine the accessible text of an element, using logic from ARIA: 
 * http://www.w3.org/TR/wai-aria/roles#textalternativecomputation
 *
 * @param {HTMLElement} el The HTMLElement
 * @param {Boolean} inLabelledByContext True when in the context of resolving a labelledBy
 * @param {Boolean} inControlContext True when in the context of textifying a widget
 * @return {string} 
 */
text.accessibleText = function (element, inLabelledByContext, inControlContext) {
	'use strict';

	var returnText	= '',
		hasLabelText = false,
		ref = null,
		inputTypes = ['text', 'search', 'tel', 'url', 'email', 'date', 'time', 'number', 'range', 'color'],
		i = 0;

	var isEmbeddedControl = function (e) {
		if (!e) { return false; }
		switch (e.tagName) {
			case 'SELECT':
			case 'TEXTAREA':
				return true;
			case 'INPUT':
				var inputType = e.getAttribute('type');
				return inputTypes.indexOf(inputType) !== -1;
			default:
				return false;
		}
	};

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
	if (!hasLabelText && !(inControlContext && isEmbeddedControl(element)) && element.hasAttribute('aria-label')) {
		returnText += ' ' + text.sanitize(element.getAttribute('aria-label'));
		hasLabelText = true;
	}
	if (!hasLabelText && (!inControlContext || !isEmbeddedControl(element)) && element.getAttribute('role') !== 'presentation') {
		if (['IMG', 'AREA', 'APPLET', 'INPUT'].indexOf(element.tagName) !== -1 &&
			element.hasAttribute('alt')) {
			returnText += ' ' + text.sanitize(element.getAttribute('alt'));
		}

		if (element.id) {
			ref = element.ownerDocument.querySelector('label[for="' + utils.escapeSelector(element.id) + '"]');
			returnText += text.accessibleText(ref, inLabelledByContext, true);
		}
		if (ref === null) {
			ref = dom.findUp(element, 'label');
			returnText += text.accessibleText(ref, inLabelledByContext, true);
		}
	}

	//Step 2b
	if (inControlContext) {
		if (element.tagName === 'INPUT' && element.hasAttribute('type')) {
			var inputType = element.getAttribute('type').toLowerCase();
			if (inputTypes.indexOf(inputType) !== -1 && element.value) {
				returnText += ' ' + element.value;
			}
		} else if (element.tagName === 'SELECT') {
			var opts = element.options;
			if (opts && opts.length) {
				for (i = 0; i < opts.length; i++) {
					if (opts[i].selected) { returnText += ' ' + opts[i].text; }
				}
			}
		} else if (element.tagName === 'TEXTAREA' && element.value) {
			returnText += ' ' + element.value;
		}
	}

	//Step 2c
	returnText = text.sanitize(returnText);
	if (returnText !== '') { return returnText; }

	if (element.hasAttribute('role') &&
		aria.getRolesWithNameFromContents().indexOf(element.getAttribute('role')) === -1) {
		return returnText;
	}

	var nodes = element.childNodes;

	for (i = 0; i < nodes.length; i++) {
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
