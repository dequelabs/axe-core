utils.findMatchingOption = function (id, options) {
	'use strict';
	var i;

	if (!options) {
		return undefined;
	}
	for (i = options.length; i--;) {
		if (options[i] && options[i].id === id) {
			return options[i];
		}
	}
	return undefined;
};