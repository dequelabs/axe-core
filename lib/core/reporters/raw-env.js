import { getEnvironmentData } from './helpers';

axe.addReporter('rawEnv', function(results, options, callback) {
	if (typeof options === 'function') {
		callback = options;
		options = {};
	}
	function rawCallback(raw) {
		const env = getEnvironmentData();
		callback({ raw, env });
	}
	axe.getReporter('raw')(results, options, rawCallback);
});
