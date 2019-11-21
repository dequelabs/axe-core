import { processAggregate, getEnvironmentData } from './helpers';
import { addReporter } from '../public';

addReporter(
	'v2',
	function(results, options, callback) {
		'use strict';
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
	},
	true
);
