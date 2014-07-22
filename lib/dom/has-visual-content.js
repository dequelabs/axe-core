/*global dom */
/*jshint maxcomplexity: 20 */
dom.hasVisualContent = function (candidate) {
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
