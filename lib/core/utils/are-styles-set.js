/* global axe*/

function areStylesSet(el, styles, stopAt) {
	'use strict';
	var styl = window.getComputedStyle(el, null);
	var set = false;
	if (!styl) {
		return false;
	}
	styles.forEach(function (att) {
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

