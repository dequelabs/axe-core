axe.addReporter('raw', function (results, options, callback) {
	'use strict';
	if (typeof options === 'function') {
		callback = options;
		options = {};
	}
	callback(results);
});
