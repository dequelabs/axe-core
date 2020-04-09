import {
	processAggregate,
	failureSummary,
	getEnvironmentData
} from './helpers';

axe.addReporter('v1', function(results, options, callback) {
	if (typeof options === 'function') {
		callback = options;
		options = {};
	}
	var out = processAggregate(results, options);

	const addFailureSummaries = result => {
		result.nodes.forEach(nodeResult => {
			nodeResult.failureSummary = failureSummary(nodeResult);
		});
	};

	out.incomplete.forEach(addFailureSummaries);
	out.violations.forEach(addFailureSummaries);

	callback({
		...getEnvironmentData(),
		toolOptions: options,
		violations: out.violations,
		passes: out.passes,
		incomplete: out.incomplete,
		inapplicable: out.inapplicable
	});
});
