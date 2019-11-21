import { processAggregate, getEnvironmentData } from './helpers';
import { addReporter } from '../public';

addReporter('na', function(results, options, callback) {
	'use strict';

	console.warn(
		'"na" reporter will be deprecated in axe v4.0. Use the "v2" reporter instead.'
	);

	if (typeof options === 'function') {
		callback = options;
		options = {};
	}

	var out = processAggregate(results, options);
	callback({
		...getEnvironmentData(),
		toolOptions: options,
		violations: out.violations,
		passes: out.passes,
		incomplete: out.incomplete,
		inapplicable: out.inapplicable
	});
});
