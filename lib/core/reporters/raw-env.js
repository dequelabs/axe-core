import { getEnvironmentData } from './helpers';
import { addReporter, getReporter } from '../public';

addReporter('rawEnv', function(results, options, callback) {
	if (typeof options === 'function') {
		callback = options;
		options = {};
	}
	function rawCallback(raw) {
		const env = getEnvironmentData();
		callback({ raw, env });
	}
	getReporter('raw')(results, options, rawCallback);
});
