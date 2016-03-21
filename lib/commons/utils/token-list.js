/*global axe */

axe.utils.tokenList = function (str) {
	'use strict';

	return str.trim().replace(/\s{2,}/g, ' ').split(' ');
};