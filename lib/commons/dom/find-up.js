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
		doc = axe.commons.dom.getRootNode(element),
		matches;

	matches = doc.querySelectorAll(target);
	matches = axe.utils.toArray(matches);
	if (doc === document && !matches.length) {
		return null;
	}

	parent = (element.assignedSlot) ? element.assignedSlot : element.parentNode;
	if (parent.nodeType === 11) {
		parent = parent.host;
	}
	// recursively walk up the DOM, checking each parent node
	while (parent && matches.indexOf(parent) === -1) {
		parent = (parent.assignedSlot) ? parent.assignedSlot : parent.parentNode;
		if (parent && parent.nodeType === 11) {
			parent = parent.host;
			doc = axe.commons.dom.getRootNode(parent);
			matches = doc.querySelectorAll(target);
			matches = axe.utils.toArray(matches);
			if (doc === document && !matches.length) {
				return null;
			}
		}
	}

	return parent;
};
