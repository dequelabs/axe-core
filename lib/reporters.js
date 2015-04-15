/*exported registerReporter, getReporter */
var reporters = {};
var defaultReporter;

function registerReporter(name, cb, isDefault) {
	'use strict';

	reporters[name] = cb;
	if (isDefault) {
		defaultReporter = cb;
	}
}

function getReporter(reporter) {
	'use strict';

	if (typeof reporter === 'string' && reporters[reporter]) {
		return reporters[reporter];
	}

	if (typeof reporter === 'function') {
		return reporter;
	}

	return defaultReporter;
}
