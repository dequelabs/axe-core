/*global dom */
/*jshint maxcomplexity: 20 */

/**
 * Check if an element is an inherently visual element
 * @param  {object}  candidate The node to check
 * @return {Boolean}
 */
dom.isVisualContent = function (candidate) {
	'use strict';
	switch (candidate.tagName.toUpperCase()) {
		case 'IMG':
		case 'IFRAME':
		case 'OBJECT':
		case 'VIDEO':
		case 'AUDIO':
		case 'CANVAS':
		case 'SVG':
		case 'MATH':
		case 'BUTTON':
		case 'SELECT':
		case 'TEXTAREA':
		case 'KEYGEN':
		case 'PROGRESS':
		case 'METER':
			return true;
		case 'INPUT':
			return candidate.type !== 'hidden';
		default:
			return false;
	}

};
