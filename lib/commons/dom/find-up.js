/*global dom, axe */
/**
 * recusively walk up the DOM, checking for a node which matches a selector
 *
 * **WARNING:** this should be used sparingly, as it's not even close to being performant
 *
 * @param {HTMLElement|String} element The starting HTMLElement
 * @param {String} selector The selector for the HTMLElement
 * @return {HTMLElement|null} Either the matching HTMLElement or `null` if there was no match
 */
dom.findUp = function (element, target) {
	'use strict';
	/*jslint browser:true*/

	var parent,
		matches = document.querySelectorAll(target),
		length = matches.length;

	if (!length) {
		return null;
	}

	matches = axe.utils.toArray(matches);

	parent = element.parentNode;
	// recrusively walk up the DOM, checking each parent node
	while (parent && matches.indexOf(parent) === -1) {
		parent = parent.parentNode;
	}

	return parent;
};
