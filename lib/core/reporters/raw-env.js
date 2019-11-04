import { getEnvironmentData } from './helpers/index.js';
import { addReporter, getReporter } from '../public/index.js';

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
