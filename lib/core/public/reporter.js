const reporters = {};
let defaultReporter;

export const hasReporter = reporterName => {
	return reporters.hasOwnProperty(reporterName);
};

export const getReporter = reporter => {
	'use strict';
	if (typeof reporter === 'string' && reporters[reporter]) {
		return reporters[reporter];
	}

	if (typeof reporter === 'function') {
		return reporter;
	}

	return defaultReporter;
};

export const registerReporter = (name, cb, isDefault) => {
	'use strict';

	reporters[name] = cb;
	if (isDefault) {
		defaultReporter = cb;
	}
};
