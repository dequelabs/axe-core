/*global text */
text.sanitize = function (str) {
	'use strict';
	return str
		.replace(/\r\n/g, '\n')
		.replace(/\u00A0/g, ' ')
		.replace(/[\s]{2,}/g, ' ')
		.trim();
};
