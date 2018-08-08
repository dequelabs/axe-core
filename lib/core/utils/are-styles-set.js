/* global axe*/

function areStylesSet(el, styles, stopAt) {
	'use strict';
	const styl = window.getComputedStyle(el, null);
	let set = false;
	if (!styl) {
		return false;
	}
	styles.forEach(function(att) {
		if (styl.getPropertyValue(att.property) === att.value) {
			set = true;
		}
	});
	if (set) {
		return true;
	}
	if (el.nodeName.toUpperCase() === stopAt.toUpperCase() || !el.parentNode) {
		return false;
	}
	return areStylesSet(el.parentNode, styles, stopAt);
}

axe.utils.areStylesSet = areStylesSet;
