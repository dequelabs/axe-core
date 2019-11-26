import {
	processAggregate,
	getEnvironmentData,
	failureSummary
} from './helpers';

function v1Reporter(results, options, callback) {
	'use strict';

	if (typeof options === 'function') {
		callback = options;
		options = {};
	}
	var out = processAggregate(results, options);

	out.violations.forEach(result =>
		result.nodes.forEach(nodeResult => {
			nodeResult.failureSummary = failureSummary(nodeResult);
		})
	);

	callback({
		...getEnvironmentData(),
		toolOptions: options,
		violations: out.violations,
		passes: out.passes,
		incomplete: out.incomplete,
		inapplicable: out.inapplicable
	});
}

export default v1Reporter;
