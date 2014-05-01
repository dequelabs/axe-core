
utils.matchesSelector = (function () {
	'use strict';

	var method, index,
		elProto = Element.prototype,
		candidates = ['matches', 'matchesSelector', 'mozMatchesSelector', 'webkitMatchesSelector', 'msMatchesSelector'],
		length = candidates.length;

	for (index = 0; index < length; index++) {
		method = candidates[index];
		/* istanbul ignore else  */
		if (elProto[method]) {
			break;
		}
	}
	return function (node, selector) {
		return node[method](selector);
	};
}());